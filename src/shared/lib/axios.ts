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
