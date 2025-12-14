import { TaskPriority, TaskStatus } from '@/constants/enums';
import type { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createTask } from '../_api/create-task';
import { getUsers } from '../_api/get-user';
import {
  type CreateTaskSchemaType,
  createTaskSchema,
} from '../_schemas/create-task.schema';

export const useAddTask = (projectId: string, sprintId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (_error) {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

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
    isLoading: form.formState.isSubmitting || loading,
    users,
  };
};
