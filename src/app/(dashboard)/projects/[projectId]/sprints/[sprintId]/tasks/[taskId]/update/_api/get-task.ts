import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

export const getTask = async (taskId: string) => {
  try {
    const res = await axiosInstance.get(`/tasks/${taskId}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to get task');
    }
  }
};
