import type { IGetExamsParams } from '@/features/exam/types/exams.d';

const EXAMS_BASE = 'exams';

export const EXAMS_KEY = {
  all: (params?: IGetExamsParams) => [EXAMS_BASE, 'all', { ...params }],
  detail: (id: string) => [EXAMS_BASE, 'detail', id],
};
