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

export interface IGetDiplomaParams extends IPaginatedParams {
  immutable?: boolean;
}
