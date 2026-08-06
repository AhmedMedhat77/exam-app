export const QUESTION_MODE_QUERY_KEY = 'mode';
export const QUESTION_MODE_STORAGE_KEY = 'question_form_mode';
export const EXAM_ID_QUERY_KEY = 'examId';

export const QUESTION_FORM_MODES = {
  SINGLE: 'single',
  BULK: 'bulk',
} as const;

export type QuestionFormMode =
  (typeof QUESTION_FORM_MODES)[keyof typeof QUESTION_FORM_MODES];
