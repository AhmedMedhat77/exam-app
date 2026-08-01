import type { IPaginatedParams } from '@/shared/types/api';

export interface IDiploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SORT_BY = 'title' | 'createdAt';
export type SORT_ORDER = 'asc' | 'desc';

export interface IGetDiplomaParams extends IPaginatedParams {
  immutable?: boolean;
  sortBy?: SORT_BY;
  sortOrder?: SORT_ORDER;
  search?: string;
}
