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
  static fetchProfile = async (): Promise<IApiResponse<{ user: IUser }>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/profile`);
    return data;
  };

  /** PATCH /api/users/profile */
  static updateProfile = async (
    payload: IUpdateProfilePayload
  ): Promise<IApiResponse<{ user: IUser }>> => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/profile`, payload);
    return data;
  };

  /** POST /api/users/change-password */
  static changePassword = async (
    payload: IChangePasswordInput
  ): Promise<IApiResponse<{ message: string }>> => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/change-password`,
      payload
    );
    return data;
  };

  /** POST /api/users/email/request */
  static requestEmailChange = async (
    payload: IRequestEmailChangeInput
  ): Promise<IApiResponse<{ message: string; code?: string }>> => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/email/request`,
      payload
    );
    return data;
  };

  /** POST /api/users/email/confirm */
  static confirmEmailChange = async (
    payload: IConfirmEmailChangeInput
  ): Promise<IApiResponse<{ message: string; user: IUser }>> => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/email/confirm`,
      payload
    );
    return data;
  };

  /** DELETE /api/users/account */
  static deleteAccount = async (): Promise<
    IApiResponse<{ message: string }>
  > => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/account`);
    return data;
  };
}
