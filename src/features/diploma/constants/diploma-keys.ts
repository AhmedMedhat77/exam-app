import type { IGetDiplomaParams } from '@/features/diploma/types/diploma.types';

export const DIPLOMA_QUERY_KEYS = {
  diplomas: {
    getAll: (params?: IGetDiplomaParams) =>
      ['diplomas', 'get-all', { ...params }] as const,
  },
};
