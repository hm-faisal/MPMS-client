import { getTaskData } from './_api/get-task';
import TaskDetailsPage from './_components/page/view';

const Page = async ({ params }: { params: Promise<{ taskId: string }> }) => {
  const { taskId } = await params;
  const task = await getTaskData(taskId);
  console.log(task);
  return <TaskDetailsPage task={task} />;
};

export default Page;
