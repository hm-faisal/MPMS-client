import { axiosInstance } from '@/lib/axios';

export const getSprintData = async (sprintId: string) => {
  const response = await axiosInstance.get(`/sprints/${sprintId}`, {});
  const data = response.data;
  return data;
};
