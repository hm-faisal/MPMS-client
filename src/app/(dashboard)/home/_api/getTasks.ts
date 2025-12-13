import { serverAxios } from '@/lib/axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export const getTasks = async () => {
  const headers = await token();
  const response = await serverAxios.get('/tasks', { headers });
  return response.data;
};
