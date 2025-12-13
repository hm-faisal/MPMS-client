import { getTasks } from '@/app/(dashboard)/home/_api/getTasks'; // your fetch function
import { KanbanBoard } from '@/app/(dashboard)/home/_components/boards/kanbanBoard';

export default async function HomePage() {
  const tasks = await getTasks(); // returns TaskWithSprintUser[]

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <KanbanBoard tasks={tasks.data} />
    </div>
  );
}
