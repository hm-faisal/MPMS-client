import { clientAxios } from '@/lib/axios';
import { toast } from 'sonner';
import type { CreateProjectSchema } from '../_schemas';

export const createProject = async (data: CreateProjectSchema) => {
  try {
    const response = await clientAxios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      data,
    );

    if (response.data.code === 409) {
      toast.error(response.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
