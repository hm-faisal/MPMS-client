import { validateEmail, validatePassword } from '@/validators';
import z from 'zod';

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: validateEmail('Email'),
  password: validatePassword('Password'),
});

/**
 * Login schema type
 */
export type LoginSchema = z.infer<typeof loginSchema>;
