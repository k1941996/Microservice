import axios from "axios";

const productService = axios.create({
  baseURL: "http://localhost:10180/",
});

productService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
productService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default productService;
