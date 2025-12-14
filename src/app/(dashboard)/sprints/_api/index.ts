import { axiosInstance } from '@/lib/axios';

export const getSprints = async () => {
  const response = await axiosInstance.get('/sprints');
  return response.data;
};
