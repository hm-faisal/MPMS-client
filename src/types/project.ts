import type { ProjectStatus } from '@/constants/enums';

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
