import axios from "axios";

const CartService = axios.create({
  baseURL: "http://localhost:4000/",
});

CartService.interceptors.request.use(
  (config) => {
    delete config.headers["content-length"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
CartService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default CartService;
