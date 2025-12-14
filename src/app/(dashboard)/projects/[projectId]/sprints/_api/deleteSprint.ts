import { axiosInstance } from '@/lib/axios';

export const deleteSprint = async (sprintId: string) => {
  try {
    const response = await axiosInstance.delete(`/sprints/${sprintId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error deleting sprint:', error);
    throw error;
  }
};
