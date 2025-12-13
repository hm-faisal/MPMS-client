import { validateEmail, validatePassword, validateString } from '@/validators';
import z from 'zod';

/**
 * Register schema
 */
export const registerSchema = z.object({
  name: validateString('Name'),
  email: validateEmail('Email'),
  password: validatePassword('Password'),
  department: validateString('Department'),
  skills: validateString('Skills'),
});

/**
 * Register schema type
 */
export type RegisterSchema = z.infer<typeof registerSchema>;
