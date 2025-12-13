import { clientAxios } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type RegisterSchema, registerSchema } from '../schemas';

export const useRegister = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      department: '',
      skills: '',
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: RegisterSchema): Promise<void> => {
      try {
        await clientAxios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
          {
            ...data,
            skills: data.skills.split(',').map((skill) => skill.trim()),
          },
        );
        toast.success('User registered successfully');
        form.reset();
        router.push('/projects');
      } catch (error) {
        console.error(error);
      }
    },
  );

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
