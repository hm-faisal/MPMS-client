import { clientAxios } from '@/lib/axios';
import type { UpdateSprintSchemaType } from '../_schema/update-sprint.schema';

export const getSprint = async (sprintId: string) => {
  const response = await clientAxios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sprints/${sprintId}`,
  );
  return response.data;
};

export const updateSprint = async (
  sprintId: string,
  data: UpdateSprintSchemaType,
) => {
  const response = await clientAxios.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sprints/${sprintId}`,
    data,
  );
  return response.data;
};
