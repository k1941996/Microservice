import axios from 'axios';

const services = new Map();
const healthCheckInterval = 30000; // 30 seconds

const register = (serviceName, serviceUrl, metadata = {}) => {
  services.set(serviceName, {
    url: serviceUrl,
    metadata,
    lastHealthCheck: Date.now(),
    isHealthy: true
  });
  console.log(`Service registered: ${serviceName} at ${serviceUrl}`);
};

const deregister = (serviceName) => {
  services.delete(serviceName);
  console.log(`Service deregistered: ${serviceName}`);
};

const getServiceUrl = (serviceName) => {
  const service = services.get(serviceName);
  if (!service || !service.isHealthy) {
    throw new Error(`Service ${serviceName} not available`);
  }
  return service.url;
};

const getAllServices = () => {
  return Array.from(services.entries()).map(([name, service]) => ({
    name,
    url: service.url,
    metadata: service.metadata,
    isHealthy: service.isHealthy,
    lastHealthCheck: service.lastHealthCheck
  }));
};

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

const startHealthChecking = () => {
  setInterval(async () => {
    for (const [serviceName] of services) {
      await healthCheck(serviceName);
    }
  }, healthCheckInterval);
};

const ServiceRegistry = {
  register,
  deregister,
  getServiceUrl,
  getAllServices,
  healthCheck,
  startHealthChecking
}; 

export default ServiceRegistry;