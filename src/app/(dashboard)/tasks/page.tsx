import { getTasks } from './_api';
import { TasksDataTable } from './_components/table';

const Page = async () => {
  const tasks = await getTasks();
  return <TasksDataTable data={tasks.data} />;
};

export default Page;
