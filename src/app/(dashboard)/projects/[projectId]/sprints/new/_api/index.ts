import { clientAxios } from '@/lib/axios';
import { toast } from 'sonner';
import type { CreateSprintSchema } from '../_schema/add-sprint.schema';

export const createSprint = async (
  projectId: string,
  data: CreateSprintSchema,
) => {
  try {
    const response = await clientAxios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}/sprints`,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
