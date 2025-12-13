import { getSprints } from './_api';
import { SprintsDataTable } from './_components/table';

const Page = async () => {
  const sprints = await getSprints();
  return <SprintsDataTable data={sprints.data} />;
};

export default Page;
