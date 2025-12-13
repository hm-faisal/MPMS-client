import { getUsers } from './_api/get-users';
import { UpdateTaskForm } from './_components/form/update-task-form';

export default async function UpdateTaskPage({
  params,
}: {
  params: Promise<{ taskId: string; projectId: string; sprintId: string }>;
}) {
  const { taskId, projectId, sprintId } = await params;
  const users = await getUsers();
  return (
    <UpdateTaskForm
      taskId={taskId}
      projectId={projectId}
      sprintId={sprintId}
      users={users.data}
    />
  );
}
