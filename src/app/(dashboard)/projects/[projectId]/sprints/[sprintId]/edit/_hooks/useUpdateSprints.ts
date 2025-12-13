import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getSprint, updateSprint } from '../_api';
import {
  type UpdateSprintSchemaType,
  updateSprintSchema,
} from '../_schema/update-sprint.schema';

export const useUpdateSprint = (sprintId: string, projectId: string) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);
  const form = useForm<UpdateSprintSchemaType>({
    resolver: zodResolver(updateSprintSchema),
    defaultValues: {
      title: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  useEffect(() => {
    let ignore = false;

    const fetchTask = async () => {
      setIsFetching(true);
      try {
        const response = await getSprint(sprintId);
        if (!ignore && response?.data) {
          const sprint = response.data;

          const normalizedData: UpdateSprintSchemaType = {
            title: sprint.title ?? '',
            startDate: new Date(sprint.startDate) ?? new Date(),
            endDate: new Date(sprint.endDate) ?? new Date(),
          };

          form.reset(normalizedData);
        } else if (!ignore) {
          toast.error('Failed to load sprint');
        }
      } catch (error) {
        if (!ignore) {
          toast.error('Error loading sprint');
          console.error('Failed to fetch sprint:', error);
        }
      } finally {
        if (!ignore) {
          setIsFetching(false);
        }
      }
    };

    if (sprintId) {
      fetchTask();
    } else {
      setIsFetching(false);
    }

    return () => {
      ignore = true;
    };
  }, [sprintId, form.reset]);

  const handleSubmit = form.handleSubmit(
    async (data: UpdateSprintSchemaType) => {
      try {
        const response = await updateSprint(sprintId, data);
        if (response?.code === 200 && response.code) {
          toast.success('Sprint updated successfully');
          router.push(`/projects/${projectId}/sprints`);
        } else {
          toast.error('Failed to update sprint');
          console.error('Failed to update sprint:', response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          return;
        }
        toast.error('An error occurred while updating the task');
        console.error('Update task error:', error);
      }
    },
  );

  return {
    form,
    handleSubmit,
    isLoading: isFetching,
  };
};
