import axios from 'axios'
import { AuthStore } from '../store/authStore';

export const axiosInstance = axios.create({
  baseURL: 'https://3050-110-13-38-3.ngrok-free.app',
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

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      alert('로그인이 필요합니다.');
      window.location.href = '/sign';
    }
  }
)
