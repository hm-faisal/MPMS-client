import { UpdateSprintForm } from './_components/form/update-sprint-form';

export default async function EditSprintPage({
  params,
}: {
  params: Promise<{ projectId: string; sprintId: string }>;
}) {
  const { projectId, sprintId } = await params;
  return <UpdateSprintForm projectId={projectId} sprintId={sprintId} />;
}
