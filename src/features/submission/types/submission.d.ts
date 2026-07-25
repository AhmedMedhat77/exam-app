import type { IPaginatedParams } from '@/shared/types/api';

export interface IAnswerSubmission {
  questionId: string;
  answerId: string;
}

export interface ISubmitExamPayload {
  examId: string;
  answers: IAnswerSubmission[];
  startedAt: string;
}

export interface ISubmissionExamInfo {
  id: string;
  title: string;
  duration: number;
}

export interface ISubmission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: ISubmissionExamInfo;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubmissionAnalyticAnswer {
  id?: string;
  text?: string;
  key?: string;
  [key: string]: unknown;
}

export interface ISubmissionAnalytic {
  questionId: string;
  questionText: string;
  selectedAnswer: ISubmissionAnalyticAnswer | string;
  isCorrect: boolean;
  correctAnswer: ISubmissionAnalyticAnswer | string;
}

export interface IGetSubmissionByIdPayload {
  submission: ISubmission;
  analytics: ISubmissionAnalytic[];
}

export interface IGetSubmissionsParams extends Partial<IPaginatedParams> {
  examId?: string;
  search?: string;
}
