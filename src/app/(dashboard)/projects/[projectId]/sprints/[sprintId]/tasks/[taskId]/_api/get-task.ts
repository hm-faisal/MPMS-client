import { axiosInstance } from '@/lib/axios';

export const getTaskData = async (taskId: string) => {
  const response = await axiosInstance.get(`/tasks/${taskId}`, {});
  const data = response.data;
  return data;
};
