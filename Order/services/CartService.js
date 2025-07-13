import { request } from "../../shared/serviceRegistry/ServiceDiscovery.js";

const CartService = {
  async get(path, options = {}) {
    try {
      return await request('cart-service', {
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
      return await request('cart-service', {
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
      return await request('cart-service', {
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
      return await request('cart-service', {
        method: 'DELETE',
        path: path,
        headers: options.headers
      });
    } catch (error) {
      throw error;
    }
  }
};

export default CartService;
