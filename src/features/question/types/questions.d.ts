import type { IPaginatedParams } from '@/shared/types/api';

export type QuestionSortBy = 'title' | 'createdAt';
export type QuestionSortOrder = 'asc' | 'desc';

export interface IExamQuestionParams extends Omit<
  Partial<IPaginatedParams>,
  'page' | 'limit' | 'sortBy'
> {
  examId?: string;
  sortBy?: QuestionSortBy;
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

export interface ICreateAnswerPayload {
  text: string;
  isCorrect: boolean;
}

export interface ICreateQuestionPayload {
  text: string;
  examId: string;
  answers: ICreateAnswerPayload[];
}
