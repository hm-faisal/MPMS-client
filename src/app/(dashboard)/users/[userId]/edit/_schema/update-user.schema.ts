import { UserRole } from '@/constants/enums';
import { validateOptionalEmail, validateOptionalString } from '@/validators';
import z from 'zod';

/**
 * Update user schema
 */
export const updateUserSchema = z.object({
  name: validateOptionalString('Name'),
  email: validateOptionalEmail('Email'),
  department: validateOptionalString('Department'),
  skills: validateOptionalString('Skills'),
  role: z.enum(UserRole).optional(),
});

/**
 * Update user schema type
 */
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
