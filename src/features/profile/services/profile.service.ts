import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse } from '@/shared/types/api';
import type {
  IChangePasswordInput,
  IConfirmEmailChangeInput,
  IRequestEmailChangeInput,
  IUpdateProfilePayload,
  IUser,
} from '../types/user';

const BASE_URL = '/api/users';

export class ProfileService {
  /** GET /api/users/profile */
  static fetchProfileApi = async (): Promise<IApiResponse<{ user: IUser }>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/profile`);
    return data;
  };

  /** PATCH /api/users/profile */
  static updateProfileApi = async (
    payload: IUpdateProfilePayload
  ): Promise<IApiResponse<{ user: IUser }>> => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/profile`, payload);
    return data;
  };

  /** POST /api/users/change-password */
  static changePasswordApi = async (
    payload: IChangePasswordInput
  ): Promise<IApiResponse<{ message: string }>> => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/change-password`,
      payload
    );
    return data;
  };

  /** POST /api/users/email/request */
  static requestEmailChangeApi = async (
    payload: IRequestEmailChangeInput
  ): Promise<IApiResponse<{ message: string; code?: string }>> => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/email/request`,
      payload
    );
    return data;
  };

  /** POST /api/users/email/confirm */
  static confirmEmailChangeApi = async (
    payload: IConfirmEmailChangeInput
  ): Promise<IApiResponse<{ message: string; user: IUser }>> => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/email/confirm`,
      payload
    );
    return data;
  };

  /** DELETE /api/users/account */
  static deleteAccountApi = async (): Promise<
    IApiResponse<{ message: string }>
  > => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/account`);
    return data;
  };
}
