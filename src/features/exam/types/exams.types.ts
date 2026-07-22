import type { IPaginatedParams } from '@/shared/types/api';

export interface IExam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: {
    id: string;
    title: string;
  };
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetExamsParams extends IPaginatedParams {
  diplomaId?: string;
  immutable?: boolean;
}
