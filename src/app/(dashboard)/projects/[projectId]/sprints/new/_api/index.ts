import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import type { CreateSprintSchema } from '../_schema/add-sprint.schema';

export const createSprint = async (
  projectId: string,
  data: CreateSprintSchema,
) => {
  try {
    const response = await axiosInstance.post(
      `/projects/${projectId}/sprints`,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
