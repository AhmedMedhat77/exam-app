import axios from 'axios';
import { useUserStore } from '@/features/user/store/user.store';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://exam-app.elevate-bootcamp.cloud';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.token = token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto Logout
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useUserStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Catch errors With backend Errors
axios.interceptors.response.use((response) => {
  const error = response.data;

  if (axios.isAxiosError(error) && error.response?.data) {
    throw new Error(error.response.data.message);
  }

  return response;
});
