import { ProjectStatus } from '@/constants/enums';
import {
  validateDate,
  validateOptionalNumber,
  validateOptionalString,
  validateOptionalUrl,
  validateString,
} from '@/validators';
import z from 'zod';

export const createProjectSchema = z.object({
  title: validateString('Title'),
  client: validateString('Client'),
  description: validateOptionalString('Description'),
  startDate: validateDate('Start Date'),
  endDate: validateDate('End Date'),
  budget: validateOptionalNumber('Budget'),
  status: z.enum(ProjectStatus),
  thumbnail: validateOptionalUrl('Thumbnail').refine(
    (value) => !value || value.startsWith('https://'),
  ),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
