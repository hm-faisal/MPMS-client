import { axiosInstance } from '@/lib/axios';

export const getUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/users/${userId}`);
  return response;
};
