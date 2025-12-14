import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import type { CreateProjectSchema } from '../_schemas';

export const createProject = async (data: CreateProjectSchema) => {
  try {
    const response = await axiosInstance.post(`/projects`, data);

    if (response.data.code === 409) {
      toast.error(response.data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
