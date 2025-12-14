import { axiosInstance } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type LoginSchema, loginSchema } from '../schemas';

export const useLogin = () => {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data: LoginSchema) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      if (response.status === 200) {
        toast.success('Login successful');
        router.push('/home');
      }
    } catch (error) {
      console.error(error);
    }
  });

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
