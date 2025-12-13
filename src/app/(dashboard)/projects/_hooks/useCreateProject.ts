import { ProjectStatus } from '@/constants/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createProject } from '../_apis/create';
import { type CreateProjectSchema, createProjectSchema } from '../_schemas';

export const useCreateProject = () => {
  const router = useRouter();
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: '',
      client: '',
      description: '',
      budget: 0,
      startDate: new Date(),
      endDate: new Date(),
      status: ProjectStatus.PLANNED,
      thumbnail: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data: CreateProjectSchema) => {
    try {
      await createProject(data);
      toast.success('Project created successfully');
      form.reset();
      router.push('/projects');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  });

  return {
    form,
    handleSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
