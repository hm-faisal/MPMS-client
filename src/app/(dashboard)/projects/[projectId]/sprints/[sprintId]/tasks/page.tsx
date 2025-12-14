import { TasksDataTable } from './_components/table';

const Page = async ({
  params,
}: {
  params: Promise<{ projectId: string; sprintId: string }>;
}) => {
  const { projectId, sprintId } = await params;
  return <TasksDataTable projectId={projectId} sprintId={sprintId} />;
};

export default Page;
