export interface ISuccessApiResponse<T> {
  status: true;
  code: number;
  payload: T;
}

export interface IErrorAiResponse {
  status: false;
  code: number;
  message: string;
}

export type IApiResponse<T> = ISuccessApiResponse<T> | IErrorAiResponse;

export type IPaginatedAPIResponse<T> = {
  payload: {
    data: T;
    metadata: IPaginatedMetaData;
  };
  success?: boolean;
};

export interface IPaginatedMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T;
  success: boolean;
}

export interface IPaginatedParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  sortOrder?: 'asc' | 'desc';
}
