import { clientAxios } from '@/lib/axios';
import { toast } from 'sonner';
import type { CreateTaskSchemaType } from '../_schemas/create-task.schema';

export const createTask = async (
  sprintId: string,
  data: CreateTaskSchemaType,
) => {
  try {
    const res = await clientAxios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sprints/${sprintId}/tasks`,
      data,
    );
    return res;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to create task');
    }
  }
};
