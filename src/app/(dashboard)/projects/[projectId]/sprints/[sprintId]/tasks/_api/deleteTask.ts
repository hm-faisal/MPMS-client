import { axiosInstance } from '@/lib/axios';

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
