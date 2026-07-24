export interface IAnswerSubmission {
  questionId: string;
  answerId: string;
}

export interface ISubmitExamPayload {
  examId: string;
  answers: IAnswerSubmission[];
  startedAt: string;
}
