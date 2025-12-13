import { clientAxios } from '@/lib/axios';

export const deleteSprint = async (sprintId: string) => {
  try {
    const response = await clientAxios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sprints/${sprintId}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error deleting sprint:', error);
    throw error;
  }
};
