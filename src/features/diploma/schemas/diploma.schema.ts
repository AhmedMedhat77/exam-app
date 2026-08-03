import { z } from 'zod';

export const diplomaSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters'),
  image: z
    .union([
      z.instanceof(File),
      z.string().min(1, 'Image URL is required'),
      z.null(),
    ])
    .refine((val) => val !== null, {
      message: 'Image is required',
    }),
});

export type DiplomaInput = z.infer<typeof diplomaSchema>;
