// Service Discovery utility for finding other services through the Health Monitor

const DEFAULT_HEALTH_MONITOR_URL = 'http://localhost:9090';

// Get the URL of a specific service
export const getServiceUrl = async (serviceName, healthMonitorUrl = DEFAULT_HEALTH_MONITOR_URL) => {
  try {
    const response = await fetch(`${healthMonitorUrl}/services/${serviceName}/url`);

    if (!response.ok) {
      throw new Error(`Service ${serviceName} not available (${response.status})`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    throw new Error(`Failed to get service URL for ${serviceName}: ${error.message}`);
  }
};

// Get health status of a specific service
export const getServiceHealth = async (serviceName, healthMonitorUrl = DEFAULT_HEALTH_MONITOR_URL) => {
  try {
    const response = await fetch(`${healthMonitorUrl}/services/${serviceName}/health`);

    if (!response.ok) {
      throw new Error(`Service ${serviceName} not found (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to get health status for ${serviceName}: ${error.message}`);
  }
};

// Get all registered services with their health status
export const getAllServices = async (healthMonitorUrl = DEFAULT_HEALTH_MONITOR_URL) => {
  try {
    const response = await fetch(`${healthMonitorUrl}/services/health`);

    if (!response.ok) {
      throw new Error(`Failed to get services (${response.status})`);
    }

    const data = await response.json();
    return data.services;
  } catch (error) {
    throw new Error(`Failed to get all services: ${error.message}`);
  }
};

// Get only healthy services
export const getHealthyServices = async (healthMonitorUrl = DEFAULT_HEALTH_MONITOR_URL) => {
  try {
    const services = await getAllServices(healthMonitorUrl);
    return services.filter(service => service.isHealthy);
  } catch (error) {
    throw new Error(`Failed to get healthy services: ${error.message}`);
  }
};

// Make a request to another service with automatic service discovery
export const request = async (serviceName, options = {}, healthMonitorUrl = DEFAULT_HEALTH_MONITOR_URL) => {
  try {
    const serviceUrl = await getServiceUrl(serviceName, healthMonitorUrl);
    const url = `${serviceUrl}${options.path || ''}`;

    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      ...options
    });

    if (!response.ok) {
      throw new Error(`Request to ${serviceName} failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Service discovery request failed for ${serviceName}: ${error.message}`);
  }
};

// Default export for backward compatibility
export default {
  getServiceUrl,
  getServiceHealth,
  getAllServices,
  getHealthyServices,
  request
}; 