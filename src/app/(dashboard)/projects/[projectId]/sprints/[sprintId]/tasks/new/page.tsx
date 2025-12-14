import { AddTaskForm } from './_components/form/add-task-form';

const NewTaskPage = async ({
  params,
}: {
  params: Promise<{ sprintId: string; projectId: string }>;
}) => {
  const { sprintId, projectId } = await params;
  return <AddTaskForm sprintId={sprintId} projectId={projectId} />;
};

export default NewTaskPage;
