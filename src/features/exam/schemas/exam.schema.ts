import { z } from 'zod';

export const examSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be at most 100 characters long' }),
  diplomaId: z.string().optional(),
  description: z
    .string()
    .max(500, { message: 'Description must be at most 500 characters' })
    .optional(),
  duration: z.coerce
    .number()
    .min(1, { message: 'Duration must be at least 1 minute' })
    .max(300, { message: 'Duration cannot exceed 300 minutes' })
    .default(20),
  image: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
});

export type ExamFormValues = z.infer<typeof examSchema>;
