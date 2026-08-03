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

export type SortBy = 'title' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

// Legacy alias compatibility
export type SORT_BY = SortBy;
export type SORT_ORDER = SortOrder;

export interface IGetDiplomaParams extends IPaginatedParams {
  immutable?: boolean;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  search?: string;
}
