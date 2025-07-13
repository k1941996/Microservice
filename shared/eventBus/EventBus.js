import amqp from 'amqplib';

// Private state using closures
let connection = null;
let channel = null;
let isConnected = false;
const subscribers = new Map();

const connect = async () => {
  if (isConnected && channel) {
    console.log('EventBus already connected');
    return;
  }

  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
    console.log('Connecting to RabbitMQ at:', rabbitmqUrl);

    connection = await amqp.connect(rabbitmqUrl);
    channel = await connection.createChannel();
    isConnected = true;

    console.log('EventBus connected to RabbitMQ');

    // Handle connection errors
    connection.on('error', (error) => {
      console.error('RabbitMQ connection error:', error);
      isConnected = false;
    });

    connection.on('close', () => {
      console.log('RabbitMQ connection closed');
      isConnected = false;
    });

  } catch (error) {
    console.error('EventBus connection failed:', error);
    isConnected = false;
    throw error;
  }
};

const ensureConnected = async () => {
  if (!isConnected || !channel) {
    console.log('EventBus.js, EventBus not connected, attempting to connect...');
    await connect();
  }
};

const publish = async (eventType, data) => {
  try {
    await ensureConnected();

    const exchange = 'ecommerce_events';
    await channel.assertExchange(exchange, 'topic', { durable: true });

    const message = {
      eventType,
      data,
      timestamp: new Date().toISOString(),
      source: process.env.SERVICE_NAME || 'unknown'
    };

    await channel.publish(
      exchange,
      eventType,
      Buffer.from(JSON.stringify(message))
    );

    console.log(`EventBus.js, Event published: ${eventType}`);
  } catch (error) {
    console.error('EventBus.js, Failed to publish event:', error);
    // Don't throw error, just log it to prevent service crashes
    console.error('EventBus.js, Event publishing failed, but continuing...');
  }
};

const subscribe = async (eventType, handler) => {
  try {
    await ensureConnected();

    const exchange = 'ecommerce_events';
    const queue = `${process.env.SERVICE_NAME || 'unknown'}_${eventType}`;

    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, eventType);

    subscribers.set(eventType, handler);

    await channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const event = JSON.parse(msg.content.toString());
          await handler(event);
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing event:', error);
          channel.nack(msg);
        }
      }
    });

    console.log(`EventBus.js, Subscribed to event: ${eventType}`);
  } catch (error) {
    console.error('Failed to subscribe to event:', error);
    throw error;
  }
};

const disconnect = async () => {
  if (channel) await channel.close();
  if (connection) await connection.close();
  isConnected = false;
};

const getConnectionStatus = () => {
  return {
    isConnected,
    hasChannel: !!channel,
    hasConnection: !!connection
  };
};

// Export the functional interface
export default {
  connect,
  publish,
  subscribe,
  disconnect,
  getConnectionStatus
}; 