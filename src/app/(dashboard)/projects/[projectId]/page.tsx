import ProjectDetailsPage from './_components/project-details';

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  return <ProjectDetailsPage projectId={projectId} />;
};

export default Page;
