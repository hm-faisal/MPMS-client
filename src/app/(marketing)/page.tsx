import HeroSection from '@/app/(marketing)/_components/hero-section';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Project Manager - Organize Projects, Ship Faster',
  description:
    'Keep your team aligned with a minimal project management system that gets out of your way.',
};

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return <HeroSection isAuthenticated={!!token} />;
}
