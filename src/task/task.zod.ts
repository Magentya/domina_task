import { z } from 'nestjs-zod/z';

export const CreateTaskSchema = z.object({
  id: z.number().describe('The id from user'),
  title: z.string().describe('The title from task'),
  description: z.string().describe('The description from task'),
});

export const UpdateTaskSchema = z.object({
  title: z.string().describe('The title from task').optional(),
  description: z.string().describe('The description from task').optional(),
  completed: z.boolean().describe('The status from task').optional(),
});
