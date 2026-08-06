import { toast } from '@/shared/ui/toast-manager';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export default function toastUtil(
  message: string,
  type: ToastType = 'success',
  description?: string
) {
  if (!message) return;

  switch (type) {
    case 'success':
      toast.success(message, description);
      break;
    case 'error':
      toast.error(message, description);
      break;
    case 'warning':
      toast.warning(message, description);
      break;
    case 'info':
      toast.info(message, description);
      break;
    default:
      toast.info(message, description);
      break;
  }
}

export { toastUtil };
