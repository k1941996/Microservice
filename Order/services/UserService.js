import axios from "axios";

const UserService = axios.create({
  baseURL: "http://localhost:8000",
});
UserService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
UserService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default UserService;
