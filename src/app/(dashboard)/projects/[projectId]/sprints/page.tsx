import { SprintsDataTable } from './_components/table';

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  return <SprintsDataTable projectId={projectId} />;
};

export default Page;
