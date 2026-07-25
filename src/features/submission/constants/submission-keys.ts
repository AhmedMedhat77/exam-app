import type { IGetSubmissionsParams } from '@/features/submission/types/submission';

const SUBMISSIONS_BASE = 'submissions';

export const SUBMISSIONS_KEY = {
  all: (params?: IGetSubmissionsParams) => [
    SUBMISSIONS_BASE,
    'all',
    { ...params },
  ],
  detail: (id?: string) => [SUBMISSIONS_BASE, 'detail', id],
};
