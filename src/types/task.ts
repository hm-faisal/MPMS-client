import type { TaskPriority, TaskStatus } from '@/constants/enums';
import type { SprintWithProject } from './sprint';
import type { User } from './user';

/**
 * @type Task - Task interface for a task in a sprint
 */

export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignees: string[];
  estimate?: number;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  sprint: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskWithSprintUser {
  _id: string;
  title: string;
  description?: string;
  assignees: User[];
  estimate?: number;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  sprint: SprintWithProject;
  createdAt: string;
  updatedAt: string;
}
