import { getUsers } from './_api';
import { UsersDataTable } from './_components/table';

const Page = async () => {
  const users = await getUsers();
  return <UsersDataTable data={users.data} />;
};

export default Page;
