import type {
  ISubmission,
  ISubmissionAnalytic,
} from '@/features/exam/types/submissions';
import type { IQuestion } from '@/features/question/types/questions';

/**
 * Maps submission analytics items to standard IQuestion structures for display in UI components.
 *
 * Extracts selected and correct answer choices from analytics entries into an array of answer options.
 *
 * @param analytics - List of question analytics returned from submission details endpoint
 * @param submission - Parent submission metadata containing examId and examTitle
 * @returns Formatted array of IQuestion objects ready for rendering
 */
export function mapAnalyticsToQuestions(
  analytics: ISubmissionAnalytic[] = [],
  submission: ISubmission
): IQuestion[] {
  return analytics.map((a) => {
    // 1. Extract user selected answer if available as an object
    const selectedAnswerChoice =
      typeof a.selectedAnswer === 'object' &&
      a.selectedAnswer &&
      a.selectedAnswer.text
        ? [
            {
              id:
                (a.selectedAnswer.id as string) ||
                (a.selectedAnswer.key as string) ||
                'selected',
              text: a.selectedAnswer.text,
              isCorrect: a.isCorrect,
            },
          ]
        : [];

    // 2. Extract correct answer choice if user's answer was incorrect and choice details exist
    const correctAnswerChoice =
      typeof a.correctAnswer === 'object' &&
      a.correctAnswer &&
      a.correctAnswer.text &&
      !a.isCorrect
        ? [
            {
              id:
                (a.correctAnswer.id as string) ||
                (a.correctAnswer.key as string) ||
                'correct',
              text: a.correctAnswer.text,
              isCorrect: true,
            },
          ]
        : [];

    // 3. Assemble question structure
    return {
      id: a.questionId,
      text: a.questionText,
      examId: submission.examId,
      immutable: true,
      createdAt: '',
      updatedAt: '',
      answers: [...selectedAnswerChoice, ...correctAnswerChoice],
      exam: {
        id: submission.examId,
        title: submission.examTitle || submission.exam?.title || '',
      },
    };
  });
}

export default mapAnalyticsToQuestions;
