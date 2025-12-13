import type { UserRole } from '@/constants/enums';

/**
 * @type User - User interface for a user in the frontend
 */

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string | null | undefined;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
