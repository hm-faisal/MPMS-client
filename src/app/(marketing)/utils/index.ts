import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

export const logout = async () => {
  try {
    await axiosInstance.post(`/auth/logout`);
    toast.success('User logged out successfully');
  } catch (error) {
    toast.error('Failed to log out user');
    console.error('Failed to log out user', error);
  }
};
