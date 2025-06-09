import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: 'https://b51e-110-13-38-3.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);