import axios from 'axios'
import { AuthStore } from '../store/authStore';


export const axiosInstance = axios.create({
  baseURL: 'https://b51e-110-13-38-3.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = AuthStore.getState().token;

  config.headers.Authorization = token
    ? `Bearer ${token}`
    : '';

  return config;
});
