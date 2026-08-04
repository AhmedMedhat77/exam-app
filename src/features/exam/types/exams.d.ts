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

export type ExamSortBy = 'title' | 'createdAt' | 'questions';
export type ExamSortOrder = 'asc' | 'desc';

export interface IGetExamsParams extends IPaginatedParams {
  diplomaId?: string;
  immutable?: boolean;
  sortBy?: ExamSortBy;
  sortOrder?: ExamSortOrder;
}

export interface ICreateExamPayload {
  title: string;
  description?: string;
  duration?: number;
  diplomaId?: string;
  image?: string | File | null;
}

export interface IUpdateExamPayload extends Partial<ICreateExamPayload> {
  immutable?: boolean;
}
