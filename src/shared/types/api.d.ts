export interface ISuccessApiResponse<T> {
  status: true;
  code: number;
  message?: string;
  payload: T;
}

export interface IErrorItem {
  path: string;
  message?: string;
  messages?: string[];
}

export interface IErrorApiResponse {
  status: false;
  code: number;
  message: string;
  payload?: undefined;
  errors?: IErrorItem[];
}

export type IErrorAiResponse = IErrorApiResponse;

export type IApiResponse<T> = ISuccessApiResponse<T> | IErrorApiResponse;

export interface IPaginatedMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type IPaginatedAPIResponse<T> = IApiResponse<{
  data: T;
  metadata: IPaginatedMetaData;
}>;

export interface IPaginatedParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
