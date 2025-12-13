import { clientAxios } from '@/lib/axios';
import type { UpdateUserSchema } from '../_schema/update-user.schema';

export const getUser = async (userId: string) => {
  const response = await clientAxios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
  );
  return response.data;
};

export const updateUser = async (
  userId: string,
  data: Omit<UpdateUserSchema, 'skills'> & { skills: string[] | undefined },
) => {
  const response = await clientAxios.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
    data,
  );
  return response.data;
};
