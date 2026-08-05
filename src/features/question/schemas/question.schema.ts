import { z } from 'zod';

export const answerSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, { message: 'Answer text cannot be empty' }),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  examId: z.string().min(1, { message: 'Please select an exam' }),
  text: z
    .string()
    .min(3, { message: 'Question headline must be at least 3 characters' }),
  answers: z
    .array(answerSchema)
    .min(2, { message: 'Question must have at least 2 answers' })
    .max(4, { message: 'Question cannot have more than 4 answers' })
    .refine((answers) => answers.some((a) => a.isCorrect), {
      message: 'One answer must be set as correct',
    }),
});

export const bulkQuestionSchema = z.object({
  examId: z.string().min(1, { message: 'Please select an exam' }),
  questions: z
    .array(
      z.object({
        text: z.string().min(3, {
          message: 'Question headline must be at least 3 characters',
        }),
        answers: z
          .array(answerSchema)
          .min(2, { message: 'Question must have at least 2 answers' })
          .max(4, { message: 'Question cannot have more than 4 answers' })
          .refine((answers) => answers.some((a) => a.isCorrect), {
            message: 'One answer must be set as correct',
          }),
      })
    )
    .min(1, { message: 'At least one question is required' }),
});

export type AnswerFormValues = z.infer<typeof answerSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;
export type BulkQuestionFormValues = z.infer<typeof bulkQuestionSchema>;
