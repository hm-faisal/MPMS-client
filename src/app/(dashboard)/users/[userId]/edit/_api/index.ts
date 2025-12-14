import { axiosInstance } from '@/lib/axios';
import type { UpdateUserSchema } from '../_schema/update-user.schema';

export const getUser = async (userId: string) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (
  userId: string,
  data: Omit<UpdateUserSchema, 'skills'> & { skills: string[] | undefined },
) => {
  const response = await axiosInstance.patch(`/users/${userId}`, data);
  return response.data;
};
