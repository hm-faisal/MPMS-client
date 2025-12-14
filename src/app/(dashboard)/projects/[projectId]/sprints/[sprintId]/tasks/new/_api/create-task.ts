import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import type { CreateTaskSchemaType } from '../_schemas/create-task.schema';

export const createTask = async (
  sprintId: string,
  data: CreateTaskSchemaType,
) => {
  try {
    const res = await axiosInstance.post(`/sprints/${sprintId}/tasks`, data);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to create task');
    }
  }
};
