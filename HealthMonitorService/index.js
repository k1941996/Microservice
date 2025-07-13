import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9090;
const HOST = process.env.HOST || 'localhost';

// In-memory service registry with health monitoring
const services = new Map();
const healthCheckInterval = 30000; // 30 seconds
const heartbeatTimeout = 60000; // 60 seconds - service considered dead if no heartbeat for 1 minute

// Service registration
const registerService = (serviceName, serviceUrl, metadata = {}) => {
  services.set(serviceName, {
    url: serviceUrl,
    metadata,
    lastHealthCheck: Date.now(),
    lastHeartbeat: Date.now(),
    isHealthy: true,
    registeredAt: Date.now()
  });
  console.log(`Service registered: ${serviceName} at ${serviceUrl}`);
};

// Service deregistration
const deregisterService = (serviceName) => {
  services.delete(serviceName);
  console.log(`Service deregistered: ${serviceName}`);
};

// Heartbeat update
const updateHeartbeat = (serviceName) => {
  const service = services.get(serviceName);
  if (service) {
    service.lastHeartbeat = Date.now();
    service.isHealthy = true;
  }
};

// Health check for a specific service
const healthCheck = async (serviceName) => {
  const service = services.get(serviceName);
  if (!service) return false;
  
  try {
    const response = await axios.get(`${service.url}/health`, { timeout: 5000 });
    service.isHealthy = response.status === 200;
    service.lastHealthCheck = Date.now();
    return service.isHealthy;
  } catch (error) {
    service.isHealthy = false;
    service.lastHealthCheck = Date.now();
    console.warn(`Health check failed for ${serviceName}:`, error.message);
    return false;
  }
};

// Cleanup stale services
const cleanupStaleServices = () => {
  const now = Date.now();
  const staleServices = [];
  
  for (const [serviceName, service] of services.entries()) {
    // If service hasn't sent heartbeat in the timeout period, mark as unhealthy
    if (now - service.lastHeartbeat > heartbeatTimeout) {
      service.isHealthy = false;
      staleServices.push(serviceName);
      console.warn(`Service ${serviceName} marked as stale (no heartbeat for ${Math.round((now - service.lastHeartbeat) / 1000)}s)`);
    }
  }
  
  return staleServices;
};

// Get all services with health status
const getAllServices = () => {
  return Array.from(services.entries()).map(([name, service]) => ({
    name,
    url: service.url,
    metadata: service.metadata,
    isHealthy: service.isHealthy,
    lastHealthCheck: service.lastHealthCheck,
    lastHeartbeat: service.lastHeartbeat,
    registeredAt: service.registeredAt
  }));
};

// Get service URL (only if healthy)
const getServiceUrl = (serviceName) => {
  const service = services.get(serviceName);
  if (!service || !service.isHealthy) {
    throw new Error(`Service ${serviceName} not available`);
  }
  return service.url;
};

// Start health checking for all services
const startHealthChecking = () => {
  setInterval(async () => {
    // Clean up stale services first
    cleanupStaleServices();
    
    // Then perform health checks on all services
    for (const [serviceName] of services) {
      await healthCheck(serviceName);
    }
  }, healthCheckInterval);
};

// Start self-heartbeat mechanism
const startSelfHeartbeat = () => {
  setInterval(async () => {
    try {
      // Send heartbeat to self
      await axios.post(`http://${HOST}:${PORT}/heartbeat/health-monitor-service`);
    } catch (error) {
      console.warn('Failed to send self-heartbeat:', error.message);
    }
  }, 30000); // Send heartbeat every 30 seconds
};

// Health check endpoint for the monitor service itself
app.get('/health', (req, res) => {
  const allServices = getAllServices();
  const healthyServices = allServices.filter(s => s.isHealthy).length;
  
  res.status(200).send({
    status: "healthy",
    service: "health-monitor-service",
    monitoredServices: {
      total: allServices.length,
      healthy: healthyServices,
      unhealthy: allServices.length - healthyServices
    },
    timestamp: new Date().toISOString()
  });
});

// Get detailed health status of all registered services
app.get('/services/health', (req, res) => {
  const allServices = getAllServices();
  res.status(200).json({
    services: allServices,
    summary: {
      totalServices: allServices.length,
      healthyServices: allServices.filter(s => s.isHealthy).length,
      unhealthyServices: allServices.filter(s => !s.isHealthy).length
    },
    timestamp: new Date().toISOString()
  });
});

// Get health status of a specific service
app.get('/services/:serviceName/health', (req, res) => {
  const { serviceName } = req.params;
  const allServices = getAllServices();
  const service = allServices.find(s => s.name === serviceName);
  
  if (!service) {
    return res.status(404).json({
      error: `Service '${serviceName}' not found`,
      availableServices: allServices.map(s => s.name)
    });
  }
  
  res.status(200).json(service);
});

// Get service URL for a specific service (with health check)
app.get('/services/:serviceName/url', (req, res) => {
  const { serviceName } = req.params;
  
  try {
    const serviceUrl = getServiceUrl(serviceName);
    res.status(200).json({
      serviceName,
      url: serviceUrl,
      status: 'available'
    });
  } catch (error) {
    res.status(503).json({
      serviceName,
      error: error.message,
      status: 'unavailable'
    });
  }
});

// Manual health check trigger
app.post('/services/health-check', async (req, res) => {
  const allServices = getAllServices();
  const results = [];
  
  for (const service of allServices) {
    try {
      const isHealthy = await healthCheck(service.name);
      results.push({
        name: service.name,
        isHealthy,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      results.push({
        name: service.name,
        isHealthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  res.status(200).json({
    results,
    summary: {
      total: results.length,
      healthy: results.filter(r => r.isHealthy).length,
      unhealthy: results.filter(r => !r.isHealthy).length
    },
    timestamp: new Date().toISOString()
  });
});

// Service registration endpoint
app.post('/services/register', (req, res) => {
  const { serviceName, serviceUrl, metadata } = req.body;
  
  if (!serviceName || !serviceUrl) {
    return res.status(400).json({
      error: 'serviceName and serviceUrl are required'
    });
  }
  
  registerService(serviceName, serviceUrl, metadata);
  
  res.status(200).json({
    message: `Service ${serviceName} registered successfully`,
    service: {
      name: serviceName,
      url: serviceUrl,
      metadata
    }
  });
});

// Service deregistration endpoint
app.post('/services/deregister', (req, res) => {
  const { serviceName } = req.body;
  
  if (!serviceName) {
    return res.status(400).json({
      error: 'serviceName is required'
    });
  }
  
  deregisterService(serviceName);
  
  res.status(200).json({
    message: `Service ${serviceName} deregistered successfully`
  });
});

// Heartbeat endpoint for services to ping
app.post('/heartbeat/:serviceName', (req, res) => {
  const { serviceName } = req.params;
  updateHeartbeat(serviceName);
  res.status(200).json({ message: 'Heartbeat received' });
});

// Register the health monitor service itself
registerService('health-monitor-service', `http://${HOST}:${PORT}`, {
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  type: 'monitoring',
  port: PORT
});

app.listen(PORT, HOST, () => {
  console.log(`Health Monitor Service running on http://${HOST}:${PORT}`);
  
  // Start health checking for all registered services
  startHealthChecking();
  console.log('Service health monitoring started - checking every 30 seconds');
  
  // Start self-heartbeat mechanism
  startSelfHeartbeat();
  console.log('Self-heartbeat mechanism started - sending heartbeats every 30 seconds');
  
  console.log('\nAvailable endpoints:');
  console.log(`- GET  http://${HOST}:${PORT}/health`);
  console.log(`- GET  http://${HOST}:${PORT}/services/health`);
  console.log(`- GET  http://${HOST}:${PORT}/services/:serviceName/health`);
  console.log(`- GET  http://${HOST}:${PORT}/services/:serviceName/url`);
  console.log(`- POST http://${HOST}:${PORT}/services/health-check`);
  console.log(`- POST http://${HOST}:${PORT}/services/register`);
  console.log(`- POST http://${HOST}:${PORT}/services/deregister`);
  console.log(`- POST http://${HOST}:${PORT}/heartbeat/:serviceName`);
}); 