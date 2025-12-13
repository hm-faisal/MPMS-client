import { TaskPriority, TaskStatus } from '@/constants/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createTask } from '../_api/create-task';
import {
  type CreateTaskSchemaType,
  createTaskSchema,
} from '../_schemas/create-task.schema';

export const useAddTask = (projectId: string, sprintId: string) => {
  const router = useRouter();
  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      assignees: [],
      estimate: undefined,
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TODO,
      dueDate: new Date(),
    },
  });

  const handleSubmit = form.handleSubmit(async (data: CreateTaskSchemaType) => {
    const response = await createTask(sprintId, data);
    if (response?.status === 201) {
      toast.success('Task created successfully');
    }
    console.log(response);
    form.reset();
    router.push(`/projects/${projectId}/sprints/${sprintId}/tasks`);
  });

  return {
    form,
    handleSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
