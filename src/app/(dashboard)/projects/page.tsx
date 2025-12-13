import { getProjects } from './_apis';
import { ProjectsDataTable } from './_components/table';

const Page = async () => {
  const projects = await getProjects();

  return (
    <div>
      <ProjectsDataTable data={projects.data} />
    </div>
  );
};

export default Page;
