import type {
  IBulkQuestionFormValues,
  IQuestionFormValues,
} from '@/features/question/schemas/question.schema';
import type {
  IAnswer,
  ICreateBulkQuestionsPayload,
  ICreateQuestionPayload,
  IQuestion,
} from '@/features/question/types/questions';

/**
 * Creates default answers for a question
 * @returns {IQuestionFormValues['answers']} Array of default {text: string, isCorrect: boolean}[] answers with one correct answer
 */
const createDefaultAnswers = (): IQuestionFormValues['answers'] => [
  { text: '', isCorrect: true },
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
];

/**
 * Creates default empty question
 * @returns {IBulkQuestionFormValues['questions'][0]} Empty question
 */

export function createEmptyQuestion(): {
  text: string;
  answers: IQuestionFormValues['answers'];
} {
  return {
    text: '',
    answers: createDefaultAnswers(),
  };
}

/**
 * Creates default single question form values
 * @param {string} examId Exam ID
 * @returns {IQuestionFormValues} Question form values with default questions
 */
export function createSingleQuestionDefaults(
  examId?: string
): IQuestionFormValues {
  return {
    examId: examId ?? '',
    text: '',
    answers: createDefaultAnswers(),
  };
}

/**
 * Creates default bulk question form values
 * @param {string} examId Exam ID
 * @returns {IBulkQuestionFormValues} Bulk question form values with default questions
 */
export function createBulkQuestionDefaults(
  examId = ''
): IBulkQuestionFormValues {
  return {
    examId,
    questions: [createEmptyQuestion()],
  };
}

const mapAnswers = (answers: IQuestionFormValues['answers']) =>
  answers.map(({ text, isCorrect }) => ({ text, isCorrect }));

export function toQuestionPayload(
  values: IQuestionFormValues
): ICreateQuestionPayload {
  return {
    examId: values.examId,
    text: values.text,
    answers: mapAnswers(values.answers),
  };
}

/**
 * Converts bulk question form values to bulk question payload
 * @param {IBulkQuestionFormValues} values Bulk question form values
 * @returns {ICreateBulkQuestionsPayload} Bulk question payload for API
 */
export function toBulkQuestionPayload(
  values: IBulkQuestionFormValues
): ICreateBulkQuestionsPayload {
  return {
    examId: values.examId,
    questions: values.questions.map(({ text, answers }) => ({
      text,
      answers: mapAnswers(answers),
    })),
  };
}

/**
 * Converts question values to question form values
 * @param {IQuestion} question Question object from API
 * @returns {IQuestionFormValues} Question form values
 */
export function toQuestionFormValues(question: IQuestion): IQuestionFormValues {
  return {
    examId: question.examId || '',
    text: question.text || '',
    answers: question.answers.map((answer: IAnswer) => ({
      id: answer.id,
      text: answer.text,
      isCorrect: answer.isCorrect,
    })),
  };
}

/**
 * Extracts error messages from form errors object
 * @param {Record<string, any>} errors Form errors object
 * @returns {string[]} Array of error messages
 */
export function getFormErrorMessages(errors: Record<string, any>): string[] {
  const messages: string[] = [];

  function extract(obj: Record<string, any>) {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.message === 'string' && obj.message) {
      messages.push(obj.message);
    }
    for (const key of Object.keys(obj)) {
      if (key === 'ref') continue;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extract(obj[key]);
      }
    }
  }

  extract(errors);
  return Array.from(new Set(messages));
}
