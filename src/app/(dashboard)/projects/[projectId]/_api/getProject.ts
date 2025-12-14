import { axiosInstance } from '@/lib/axios';

export const getProject = async (projectId: string) => {
  const response = await axiosInstance.get(`/projects/${projectId}`);
  const data = response.data;
  return data;
};
