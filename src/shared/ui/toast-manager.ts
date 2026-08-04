import { Toast as ToastPrimitive } from '@base-ui/react/toast';

const baseToast = ToastPrimitive.createToastManager();

export const toast = Object.assign(baseToast, {
  success: (title: string, description?: string) =>
    baseToast.add({ title, description, type: 'success' }),
  error: (title: string, description?: string) =>
    baseToast.add({ title, description, type: 'error' }),
  info: (title: string, description?: string) =>
    baseToast.add({ title, description, type: 'info' }),
  warning: (title: string, description?: string) =>
    baseToast.add({ title, description, type: 'warning' }),
});

export const createToastManager = ToastPrimitive.createToastManager;
export const useToastManager = ToastPrimitive.useToastManager;
