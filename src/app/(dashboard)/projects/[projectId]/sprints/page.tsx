import { getSprints } from './_api';
import { SprintsDataTable } from './_components/table';

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  const sprints = await getSprints(projectId);
  return <SprintsDataTable data={sprints.data.sprints} projectId={projectId} />;
};

export default Page;
