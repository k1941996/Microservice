import { request } from "../../shared/serviceRegistry/ServiceDiscovery.js";

const productService = {
  async get(path, options = {}) {
    try {
      return await request('product-service', {
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
      return await request('product-service', {
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
      return await request('product-service', {
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
      return await request('product-service', {
        method: 'DELETE',
        path: path,
        headers: options.headers
      });
    } catch (error) {
      throw error;
    }
  }
};

export default productService;
