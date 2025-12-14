import TaskDetailsPage from './_components/page/view';

const Page = async ({ params }: { params: Promise<{ taskId: string }> }) => {
  const { taskId } = await params;
  return <TaskDetailsPage taskId={taskId} />;
};

export default Page;
