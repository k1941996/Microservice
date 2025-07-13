import connectDB from "#config/dbConfig.js";
import express from "express";
import dotenv from "dotenv";
import orderRoutes from "#routes/orderRoutes.js";
import { initializeEventHandlers } from "./eventHandlers/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
connectDB(DATABASE_URL)

// Health check endpoint with database connectivity check
app.get("/health", async (req, res) => {
  try {
    // You can add database connectivity check here if needed
    res.status(200).send({ 
      status: "healthy", 
      service: "order-service",
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).send({ 
      status: "unhealthy", 
      service: "order-service",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get("/hello", (_, res) => {
  res.status(200).send({message:"Hello from order service."})
});

app.use(orderRoutes)

// Initialize event handlers
initializeEventHandlers().then(() => {
  console.log('Successfully initialized Order Service event handlers');
}).catch(error => {
  console.error('Failed to initialize event handlers:', error);
});

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
        serviceName: 'order-service',
        serviceUrl: `http://${HOST}:${PORT}`,
        metadata: {
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          port: PORT
        }
      })
    });
    
    if (response.ok) {
      console.log('Order service registered with health monitor');
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
        serviceName: 'order-service'
      })
    });
    console.log('Order service deregistered from health monitor');
  } catch (error) {
    console.warn('Failed to deregister from health monitor:', error.message);
  }
};

// Start heartbeat to health monitor service
const startHeartbeat = () => {
  const heartbeatInterval = setInterval(async () => {
    try {
      const healthMonitorUrl = process.env.HEALTH_MONITOR_URL || 'http://localhost:9090';
      await fetch(`${healthMonitorUrl}/heartbeat/order-service`, { method: 'POST' });
    } catch (error) {
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
  console.log(`Order service running on http://${HOST}:${PORT}`);
  
  // Register with health monitor and start heartbeat only if registration succeeds
  const registrationSuccess = await registerWithHealthMonitor();
  if (registrationSuccess) {
    startHeartbeat();
  } else {
    console.log('Heartbeat not started due to failed registration with health monitor');
  }
})