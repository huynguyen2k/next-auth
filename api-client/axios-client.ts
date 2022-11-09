import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'Application/json',
  },
});

axiosClient.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);
