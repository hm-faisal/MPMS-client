import { clientAxios } from '@/lib/axios';
import { toast } from 'sonner';
import type { UpdateTaskSchemaType } from '../_schemas/update-task.schema';

export const updateTask = async (
  taskId: string,
  data: UpdateTaskSchemaType,
) => {
  try {
    const res = await clientAxios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}`,
      data,
    );
    return res;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to update task');
    }
  }
};
