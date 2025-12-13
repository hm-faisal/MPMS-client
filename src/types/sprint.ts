import type { Project } from './project';
import type { Task } from './task';

/**
 * @type Sprint - Sprint interface for a sprint in a project
 */

export interface Sprint {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  projectId: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface SprintWithProject {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
