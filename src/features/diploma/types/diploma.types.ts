export interface IDiploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetDiplomaParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'asc' | 'desc';
  sortOrder?: 'asc' | 'desc';
  immutable?: boolean;
}
