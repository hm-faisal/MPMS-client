'use client';

import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { UserRoundMinus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        try {
          const res = await axiosInstance.post(`/auth/logout`);
          if (res.status === 204) {
            toast.success('Logout successful');
            router.push('/login');
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
            return;
          }
          toast.error('Logout failed');
        }
      }}
    >
      <UserRoundMinus />
      Logout
    </Button>
  );
};

export default LogoutButton;
