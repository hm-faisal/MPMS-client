import { getTasks } from './_api';
import { TasksDataTable } from './_components/table';

const Page = async ({
  params,
}: {
  params: Promise<{ projectId: string; sprintId: string }>;
}) => {
  const { projectId, sprintId } = await params;
  const tasks = await getTasks(sprintId);
  console.log(tasks);
  return (
    <TasksDataTable
      data={tasks.data}
      projectId={projectId}
      sprintId={sprintId}
    />
  );
};

export default Page;
