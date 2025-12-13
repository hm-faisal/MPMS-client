import { validateOptionalDate, validateOptionalString } from '@/validators';
import z from 'zod';

export const updateSprintSchema = z.object({
  title: validateOptionalString('title'),
  startDate: validateOptionalDate('startDate'),
  endDate: validateOptionalDate('endDate'),
});

export type UpdateSprintSchemaType = z.infer<typeof updateSprintSchema>;
