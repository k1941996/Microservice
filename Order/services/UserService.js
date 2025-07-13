import { request } from "../../shared/serviceRegistry/ServiceDiscovery.js";

const UserService = {
  async get(path, options = {}) {
    try {
      return await request('auth-service', {
        method: 'GET',
        path: path,
        headers: options.headers
      });
    } catch (error) {
      throw error;
    }
  },

  async post(path, data, options = {}) {
    try {
      return await request('auth-service', {
        method: 'POST',
        path: path,
        body: data,
        headers: options.headers
      });
    } catch (error) {
      throw error;
    }
  },

  async put(path, data, options = {}) {
    try {
      return await request('auth-service', {
        method: 'PUT',
        path: path,
        body: data,
        headers: options.headers
      });
    } catch (error) {
      throw error;
    }
  },

  async delete(path, options = {}) {
    try {
      return await request('auth-service', {
        method: 'DELETE',
        path: path,
        headers: options.headers
      });
    } catch (error) {
      throw error;
    }
  }
};

export default UserService;
