import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createSprint } from '../_api';
import {
  type CreateSprintSchema,
  createSprintSchema,
} from '../_schema/add-sprint.schema';

export const useCreateSprint = (projectId: string) => {
  const router = useRouter();
  const form = useForm<CreateSprintSchema>({
    resolver: zodResolver(createSprintSchema),
    defaultValues: {
      title: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await createSprint(projectId, data);
    form.reset();
    toast.success('Sprint created successfully');
    router.push(`/projects/${projectId}/sprints`);
  });

  return {
    form,
    handleSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
