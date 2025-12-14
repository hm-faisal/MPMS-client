import type { ProjectStatus } from '@/constants/enums';
import type { Sprint } from './sprint';
import type { User } from './user';

/**
 * @type Project - Project interface for a project in the frontend
 */

export interface Project {
  _id: string;
  title: string;
  client: string;
  description: string | null;
  startDate: string;
  endDate: string;
  budget: number | null;
  status: ProjectStatus;
  thumbnail: string | null;
  members: string[];
  sprints: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * @type ProjectWithUser - Payload for creating a new project
 */

export interface ProjectWithUserAndSprint {
  _id: string;
  title: string;
  client: string;
  description: string | null;
  startDate: string;
  endDate: string;
  budget: number | null;
  status: ProjectStatus;
  thumbnail: string | null;
  members: User[];
  sprints: Sprint[];
  createdAt: string;
  updatedAt: string;
}
