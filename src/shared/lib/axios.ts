import { useUserStore } from '@/features/user/store/user.store';
import axios from 'axios';

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

// Auto Logout on 401 & Global Error Toasts
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      window.location.href = '/login';
    } else {
      const message =
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
      return Promise.reject(
        error instanceof Error ? error : new Error(message)
      );
    }
    return Promise.reject(error);
  }
);

// Catch backend error messages
axiosInstance.interceptors.response.use((response) => {
  const data = response.data;

  if (axios.isAxiosError(data) && data.response?.data) {
    throw new Error(data.response.data.message);
  }

  return response;
});
