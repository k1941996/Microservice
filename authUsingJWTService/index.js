import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from '#config/dbConfig.js';
import routes from '#routes/index.js';
import gatewayRouter from '#routes/gatewayRoutes.js';
import EventBus from '../shared/eventBus/EventBus.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

// Health check endpoint with database and event bus connectivity check
app.get('/health', async (req, res) => {
  try {
    const eventBusStatus = EventBus.getConnectionStatus();
    res.status(200).send({ 
      status: "healthy", 
      service: "auth-service",
      database: "connected",
      eventBus: eventBusStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).send({ 
      status: "unhealthy", 
      service: "auth-service",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/hello', (req, res) => {
  res.status(200).send('Hello from gateway service');
});

app.use(routes);
app.use(gatewayRouter);

// Initialize EventBus connection
const initializeEventBus = async () => {
  try {
    await EventBus.connect();
    console.log('Auth Service EventBus initialized');
  } catch (error) {
    console.error('Failed to initialize EventBus:', error);
    console.log('Service will continue without event publishing');
  }
};

// Register service with health monitor
const registerWithHealthMonitor = async () => {
  try {
    const healthMonitorUrl = process.env.HEALTH_MONITOR_URL || 'http://localhost:9090';
    const response = await fetch(`${healthMonitorUrl}/services/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceName: 'auth-service',
        serviceUrl: `http://${HOST}:${PORT}`,
        metadata: {
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          port: PORT
        }
      })
    });
    
    if (response.ok) {
      console.log('Auth service registered with health monitor');
      return true; // Return true on successful registration
    } else {
      console.warn('Failed to register with health monitor:', response.statusText);
      return false;
    }
  } catch (error) {
    console.warn('Failed to register with health monitor:', error.message);
    return false;
  }
};

// Deregister service from health monitor
const deregisterFromHealthMonitor = async () => {
  try {
    const healthMonitorUrl = process.env.HEALTH_MONITOR_URL || 'http://localhost:9090';
    await fetch(`${healthMonitorUrl}/services/deregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceName: 'auth-service'
      })
    });
    console.log('Auth service deregistered from health monitor');
  } catch (error) {
    console.warn('Failed to deregister from health monitor:', error.message);
  }
};

// Start heartbeat to health monitor service
const startHeartbeat = () => {
  const heartbeatInterval = setInterval(async () => {
    try {
      const healthMonitorUrl = process.env.HEALTH_MONITOR_URL || 'http://localhost:9090';
      await fetch(`${healthMonitorUrl}/heartbeat/auth-service`, { method: 'POST' });
    } catch (error) {
      console.log('error', error.code);
      console.warn('Failed to send heartbeat to health monitor:', error.message);
    }
  }, 30000); // Send heartbeat every 30 seconds

  // Cleanup on process exit
  process.on('SIGINT', async () => {
    clearInterval(heartbeatInterval);
    await deregisterFromHealthMonitor();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    clearInterval(heartbeatInterval);
    await deregisterFromHealthMonitor();
    process.exit(0);
  });
};

app.listen(PORT, HOST, async () => {
  console.log(`Gateway service with auth running on http://${HOST}:${PORT}`);

  // Initialize EventBus after server starts
  await initializeEventBus();
  
  // Register with health monitor and start heartbeat only if registration succeeds
  const registrationSuccess = await registerWithHealthMonitor();
  if (registrationSuccess) {
    startHeartbeat();
  } else {
    console.log('Heartbeat not started due to failed registration with health monitor');
  }
});


