import SprintDetailsPage from './_components/sprint';

const Page = async ({
  params,
}: {
  params: Promise<{ projectId: string; sprintId: string }>;
}) => {
  const { projectId, sprintId } = await params;
  return <SprintDetailsPage projectId={projectId} sprintId={sprintId} />;
};

export default Page;
