import { UpdateUserForm } from './_components/update-profile-form';

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  return <UpdateUserForm userId={userId} />;
};

export default Page;
