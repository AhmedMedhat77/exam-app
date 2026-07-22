import type { IPaginatedParams } from '@/shared/types/api';

export interface IExamQuestionParams extends Omit<Partial<IPaginatedParams>, 'page' | 'limit'> {
  examId?: string;
  immutable?: boolean;
}

export interface IQuestion {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
  exam: IExam;
}

export interface IExam {
  id: string;
  title: string;
}
export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}
