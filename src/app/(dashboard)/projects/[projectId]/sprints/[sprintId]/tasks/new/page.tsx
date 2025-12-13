import { getUsers } from './_api/get-user';
import { AddTaskForm } from './_components/form/add-task-form';

const NewTaskPage = async ({
  params,
}: {
  params: Promise<{ sprintId: string; projectId: string }>;
}) => {
  const { sprintId, projectId } = await params;
  const users = await getUsers();
  return (
    <AddTaskForm sprintId={sprintId} users={users} projectId={projectId} />
  );
};

export default NewTaskPage;
