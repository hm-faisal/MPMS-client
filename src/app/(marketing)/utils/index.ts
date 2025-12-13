import { clientAxios } from '@/lib/axios';
import { toast } from 'sonner';

export const logout = async () => {
  try {
    await clientAxios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
    );
    toast.success('User logged out successfully');
  } catch (error) {
    toast.error('Failed to log out user');
    console.error('Failed to log out user', error);
  }
};
