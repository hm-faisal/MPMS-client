import { clientAxios } from '@/lib/axios';

export const deleteTask = async (taskId: string) => {
  try {
    const response = await clientAxios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
