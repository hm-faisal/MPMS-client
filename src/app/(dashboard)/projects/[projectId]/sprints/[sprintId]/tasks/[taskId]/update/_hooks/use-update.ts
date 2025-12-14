import { TaskPriority, TaskStatus } from '@/constants/enums';
import type { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type UpdateTaskSchemaType, updateTaskSchema } from '../../_schemas';
import { getTask } from '../_api/get-task';
import { getUsers } from '../_api/get-users';
import { updateTask } from '../_api/update-task';

export const useUpdateTask = (
  taskId: string,
  projectId: string,
  sprintId: string,
) => {
  const router = useRouter();
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
  const [isFetching, setIsFetching] = useState(true);
  const form = useForm<UpdateTaskSchemaType>({
    resolver: zodResolver(updateTaskSchema),
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

  useEffect(() => {
    let ignore = false;

    const fetchTask = async () => {
      setIsFetching(true);
      try {
        const response = await getTask(taskId);
        if (!ignore && response?.data) {
          const task = response.data;

          const normalizedData: UpdateTaskSchemaType = {
            title: task.title ?? '',
            description: task.description ?? '',
            assignees: Array.isArray(task.assignee) ? task.assignee : [],
            estimate: task.estimate ?? undefined,
            priority: task.priority ?? TaskPriority.MEDIUM,
            status: task.status ?? TaskStatus.TODO,
            dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
          };

          form.reset(normalizedData);
        } else if (!ignore) {
          toast.error('Failed to load task');
        }
      } catch (error) {
        if (!ignore) {
          toast.error('Error loading task');
          console.error('Failed to fetch task:', error);
        }
      } finally {
        if (!ignore) {
          setIsFetching(false);
        }
      }
    };

    if (taskId) {
      fetchTask();
    } else {
      setIsFetching(false);
    }

    return () => {
      ignore = true;
    };
  }, [taskId, form.reset]);

  const handleSubmit = form.handleSubmit(async (data: UpdateTaskSchemaType) => {
    try {
      const response = await updateTask(taskId, data);
      if (response?.status === 200 && response.data) {
        toast.success('Task updated successfully');
        router.push(
          `/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`,
        );
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      toast.error('An error occurred while updating the task');
      console.error('Update task error:', error);
    }
  });

  return {
    form,
    handleSubmit,
    users,
    isLoading: isFetching || loading || form.formState.isSubmitting,
  };
};
