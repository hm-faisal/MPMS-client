import { axiosInstance } from '@/lib/axios';

export const getSprints = async (projectId: string) => {
  const response = await axiosInstance.get(
    `/projects/${projectId}/sprints`,
    {},
  );
  return response.data;
};
