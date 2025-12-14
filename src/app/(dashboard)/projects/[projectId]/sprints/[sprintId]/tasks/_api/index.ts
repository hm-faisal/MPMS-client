import { axiosInstance } from '@/lib/axios';

export const getTasks = async (sprintId: string) => {
  const response = await axiosInstance.get(`/sprints/${sprintId}/tasks`, {});
  return response.data;
};
