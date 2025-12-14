import UserProfilePage from './_components/user-profile';

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  return <UserProfilePage userId={userId} />;
};

export default Page;
