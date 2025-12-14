import { UpdateTaskForm } from './_components/form/update-task-form';

export default async function UpdateTaskPage({
  params,
}: {
  params: Promise<{ taskId: string; projectId: string; sprintId: string }>;
}) {
  const { taskId, projectId, sprintId } = await params;
  return (
    <UpdateTaskForm taskId={taskId} projectId={projectId} sprintId={sprintId} />
  );
}
