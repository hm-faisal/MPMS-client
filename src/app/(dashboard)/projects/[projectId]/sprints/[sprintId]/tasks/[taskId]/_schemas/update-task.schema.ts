import { TaskPriority, TaskStatus } from '@/constants/enums';
import {
  validateOptionalDate,
  validateOptionalNumber,
  validateOptionalString,
  validateOptionalStringArray,
} from '@/validators';
import { z } from 'zod';

export const updateTaskSchema = z.object({
  title: validateOptionalString('Title'),
  description: validateOptionalString('Description'),
  assignees: validateOptionalStringArray('Assignees'),
  estimate: validateOptionalNumber('Estimate'),
  priority: z.enum(TaskPriority).optional(),
  status: z.enum(TaskStatus).optional(),
  dueDate: validateOptionalDate('Due Date'),
});

export type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>;
