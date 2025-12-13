import { UserRole } from '@/constants/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getUser, updateUser } from '../_api';
import {
  type UpdateUserSchema,
  updateUserSchema,
} from '../_schema/update-user.schema';

export const useUpdateUser = (userId: string) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      skills: '',
      role: UserRole.MEMBER,
      department: '',
    },
  });

  useEffect(() => {
    let ignore = false;

    const fetchTask = async () => {
      setIsFetching(true);
      try {
        const response = await getUser(userId);
        if (!ignore && response?.data) {
          const user = response.data;

          const normalizedData: UpdateUserSchema = {
            name: user.name ?? '',
            email: user.email ?? '',
            skills: user.skills.join(', ') ?? '',
            role: user.role ?? UserRole.MEMBER,
            department: user.department ?? '',
          };

          form.reset(normalizedData);
        } else if (!ignore) {
          toast.error('Failed to load user');
        }
      } catch (error) {
        if (!ignore) {
          toast.error('Error loading user');
          console.error('Failed to fetch user:', error);
        }
      } finally {
        if (!ignore) {
          setIsFetching(false);
        }
      }
    };

    if (userId) {
      fetchTask();
    } else {
      setIsFetching(false);
    }

    return () => {
      ignore = true;
    };
  }, [userId, form.reset]);

  const handleSubmit = form.handleSubmit(async (data: UpdateUserSchema) => {
    try {
      const response = await updateUser(userId, {
        ...data,
        skills: data?.skills?.split(',').map((skill) => skill.trim()),
      });
      if (response?.code === 200 && response.code) {
        toast.success('User updated successfully');
        router.push(`/users`);
      } else {
        toast.error('Failed to update user');
        console.error('Failed to update user:', response);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error('An error occurred while updating the user');
      console.error('Update user error:', error);
    }
  });

  return {
    form,
    handleSubmit,
    isLoading: isFetching,
  };
};
