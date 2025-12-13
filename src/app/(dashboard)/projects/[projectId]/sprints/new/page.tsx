import { AddSprintForm } from './_components/form/add-sprint';

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  return <AddSprintForm projectId={projectId} />;
};

export default Page;
