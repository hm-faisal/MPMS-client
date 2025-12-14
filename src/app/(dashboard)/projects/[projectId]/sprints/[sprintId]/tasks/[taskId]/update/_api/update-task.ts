import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import type { UpdateTaskSchemaType } from '../../_schemas';

export const updateTask = async (
  taskId: string,
  data: UpdateTaskSchemaType,
) => {
  try {
    const res = await axiosInstance.patch(`/tasks/${taskId}`, data);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to update task');
    }
  }
};
