import { KanbanBoard } from '@/app/(dashboard)/home/_components/boards/kanbanBoard';

export default async function HomePage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}
