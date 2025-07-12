import EventBus from './shared/eventBus/EventBus.js';

const testRabbitMQ = async () => {
  try {
    console.log('Testing RabbitMQ connection...');
    
    // Try to connect
    await EventBus.connect();
    console.log('✅ RabbitMQ connection successful!');
    
    // Try to publish a test event
    await EventBus.publish('test.event', { message: 'Hello from test' });
    console.log('✅ Event publishing successful!');
    
    // Get connection status
    const status = EventBus.getConnectionStatus();
    console.log('Connection status:', status);
    
  } catch (error) {
    console.error('❌ RabbitMQ test failed:', error.message);
    console.log('\nTo fix this:');
    console.log('1. Make sure RabbitMQ is running');
    console.log('2. Check if RABBITMQ_URL environment variable is set correctly');
    console.log('3. Try: docker-compose up rabbitmq -d');
  }
};

testRabbitMQ(); 