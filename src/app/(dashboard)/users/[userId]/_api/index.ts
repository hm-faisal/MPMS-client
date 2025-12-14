import { axiosInstance } from '@/lib/axios';

export const getUser = async (userId: string) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};
