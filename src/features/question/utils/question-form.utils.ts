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

const createDefaultAnswers = () => [
  { text: '', isCorrect: true },
  { text: '', isCorrect: false },
];

export function createEmptyQuestion() {
  return {
    text: '',
    answers: createDefaultAnswers(),
  };
}

export function createSingleQuestionDefaults(examId = ''): IQuestionFormValues {
  return {
    examId,
    text: '',
    answers: createDefaultAnswers(),
  };
}

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
