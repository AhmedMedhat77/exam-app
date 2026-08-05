import { axiosInstance } from '@/shared/lib/axios';

export class UploadService {
  static async uploadApi(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axiosInstance.post<{
      status: boolean;
      payload: { url: string };
    }>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data?.payload?.url || '';
  }
}
