import { axiosInstance } from '@/lib/axios';

export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
};
