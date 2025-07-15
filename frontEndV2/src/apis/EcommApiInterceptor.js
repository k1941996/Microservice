import { getAccountId, getToken } from '@utils/tokenUtil';
import axios from 'axios';
const eComm = axios.create({
  baseURL: 'http://localhost:8000',
});
eComm.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = 'Bearer ' + getToken();
    config.headers['accountid'] = getAccountId();
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
eComm.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific HTTP error responses
      if (error.response.status === 401) {
        // Handle unauthorized errors (e.g., redirect to login)
        console.error('Unauthorized, please login again');
      } else if (error.response.status === 500) {
        // Handle server errors
        console.error('Server error occurred');
      }
    } else {
      // Handle network or other errors
      console.error('Network error or no response');
    }
    return Promise.reject(error);
  }
);

export default eComm;

export const eCommRTKBaseQuery = async ({ url, method = 'GET', data, params }) => {
  try {
    const response = await eComm({
      url,
      method,
      data,
      params,
    });
    return {
      data: response.data,
      meta: {
        status: response.status,
      },
    };
  } catch (error) {
    return { error: error.response ? error.response.data : error.message };
  }
};
