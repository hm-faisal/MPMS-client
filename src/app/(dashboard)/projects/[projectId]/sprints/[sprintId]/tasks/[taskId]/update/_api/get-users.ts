import { clientAxios } from '@/lib/axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

const token = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return redirect('/login');
  }
  const headers: Record<string, string> = {};
  if (token) {
    headers.cookie = `token=${token}`;
  }

  return headers;
};

export const getUsers = async () => {
  try {
    const res = await clientAxios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
      {
        headers: await token(),
      },
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to get users');
    }
  }
};
