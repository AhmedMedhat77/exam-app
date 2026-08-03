import type {
  IDiploma,
  IGetDiplomaParams,
} from '@/features/diploma/types/diploma.d';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse, IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/diplomas';

export interface IDiplomaPayload {
  title: string;
  description: string;
  image?: File | string | null;
}

export default class DiplomaService {
  static getDiplomasApi = async (
    params?: IGetDiplomaParams
  ): Promise<IPaginatedAPIResponse<IDiploma[]>> => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data;
  };

  static getDiplomaByIdApi = async (
    id: string
  ): Promise<IApiResponse<{ diploma: IDiploma } | IDiploma>> => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  };

  /** POST /api/diplomas - Create a new diploma */
  static createDiplomaApi = async (
    payload: IDiplomaPayload
  ): Promise<IApiResponse<{ diploma: IDiploma } | IDiploma>> => {
    let data: FormData | Record<string, any> = payload;

    if (payload.image instanceof File) {
      const formData = new FormData();
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      formData.append('image', payload.image);
      data = formData;
    }

    const response = await axiosInstance.post(BASE_URL, data, {
      headers:
        data instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
    });
    return response.data;
  };

  /** PUT /api/diplomas/{id} - Update an existing diploma */
  static updateDiplomaApi = async (
    id: string,
    payload: IDiplomaPayload
  ): Promise<IApiResponse<{ diploma: IDiploma } | IDiploma>> => {
    let data: FormData | Record<string, any> = payload;

    if (payload.image instanceof File) {
      const formData = new FormData();
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      formData.append('image', payload.image);
      data = formData;
    }

    const response = await axiosInstance.put(`${BASE_URL}/${id}`, data, {
      headers:
        data instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
    });
    return response.data;
  };

  /** DELETE /api/diplomas/{id} - Delete a diploma */
  static deleteDiplomaApi = async (
    id: string
  ): Promise<IApiResponse<{ message: string }>> => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  };
}
