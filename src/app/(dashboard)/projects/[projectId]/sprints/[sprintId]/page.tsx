import { getSprintData } from './_api';
import SprintDetailsPage from './_components/sprint';

const Page = async ({
  params,
}: {
  params: Promise<{ projectId: string; sprintId: string }>;
}) => {
  const { projectId, sprintId } = await params;
  const sprint = await getSprintData(sprintId);
  return <SprintDetailsPage sprint={sprint} projectId={projectId} />;
};

export default Page;
