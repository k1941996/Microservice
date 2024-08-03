import { getAccountId, getToken } from "$utils/tokenUtil";
import axios from "axios";
const Ecomm = axios.create({
  baseURL: "http://localhost:8000",
});
Ecomm.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    config.headers.accountid = getAccountId();
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
Ecomm.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Ecomm;
