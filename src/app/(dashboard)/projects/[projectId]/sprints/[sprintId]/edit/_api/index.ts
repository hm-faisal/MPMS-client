import { axiosInstance } from '@/lib/axios';
import type { UpdateSprintSchemaType } from '../_schema/update-sprint.schema';

export const getSprint = async (sprintId: string) => {
  const response = await axiosInstance.get(`/sprints/${sprintId}`);
  return response.data;
};

export const updateSprint = async (
  sprintId: string,
  data: UpdateSprintSchemaType,
) => {
  const response = await axiosInstance.patch(`/sprints/${sprintId}`, data);
  return response.data;
};
