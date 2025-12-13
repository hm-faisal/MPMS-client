'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaskPriority, TaskStatus } from '@/constants/enums';
import type { TaskWithSprintUser } from '@/types';
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, GripVertical, User } from 'lucide-react';
import { useState } from 'react';
import { updateTask } from '../../_api/updateTask';

// Status config
const STATUSES: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.REVIEW,
  TaskStatus.DONE,
];

const statusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.REVIEW]: 'Review',
  [TaskStatus.DONE]: 'Done',
};

const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'bg-primary/10 text-primary',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-50 text-blue-900',
  [TaskStatus.REVIEW]: 'bg-purple-50 text-purple-900',
  [TaskStatus.DONE]: 'bg-green-50 text-green-900',
};

const getPriorityVariant = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return 'destructive';
    case TaskPriority.MEDIUM:
      return 'default';
    default:
      return 'secondary';
  }
};

function TaskCard({ task }: { task: TaskWithSprintUser }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: task._id,
      data: { task },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-card p-3 shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? 'ring-2 ring-primary' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3 w-3" />
        </Button>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm wrap-break-word">{task.title}</h4>
          {task.estimate && (
            <p className="text-xs text-muted-foreground mt-1">
              {task.estimate}h
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority.toLowerCase()}
            </Badge>
            {task.dueDate && (
              <span className="text-xs flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
          {task.assignees && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              {task.assignees.map((assignee) => assignee.name).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({
  id,
  title,
  tasks,
  status,
}: {
  id: TaskStatus;
  title: string;
  tasks: TaskWithSprintUser[];
  status: TaskStatus;
}) {
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setDroppableRef}
      className={`flex flex-col w-full sm:w-64 md:w-72 shrink-0 ${
        isOver ? 'opacity-70' : ''
      }`}
    >
      <div className={`p-2 rounded-t-lg ${statusColors[status]}`}>
        <h3 className="font-medium text-sm">
          {title} ({tasks.length})
        </h3>
      </div>
      <div className="flex-1 min-h-40 p-2 bg-background rounded-b-lg border">
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

export function KanbanBoard({ tasks }: { tasks: TaskWithSprintUser[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<Record<TaskStatus, TaskWithSprintUser[]>>(
    () => {
      const initial: Record<TaskStatus, TaskWithSprintUser[]> = {
        [TaskStatus.TODO]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.REVIEW]: [],
        [TaskStatus.DONE]: [],
      };
      tasks.forEach((task) => {
        initial[task.status].push(task);
      });
      return initial;
    },
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const activeTask = activeId
    ? Object.values(items)
        .flat()
        .find((t) => t._id === activeId)
    : null;

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeTask = Object.values(items)
      .flat()
      .find((t) => t._id === active.id);
    if (!activeTask) return;

    const overId = over.id;

    if (typeof overId === 'string' && STATUSES.includes(overId as TaskStatus)) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        const newItems = { ...items };
        newItems[activeTask.status] = newItems[activeTask.status].filter(
          (t) => t._id !== active.id,
        );
        activeTask.status = newStatus;
        newItems[newStatus] = [...newItems[newStatus], activeTask];
        setItems(newItems);

        updateTask(activeTask._id, { status: newStatus }).catch((err) => {
          console.error('Failed to update task status:', err);
        });
      }
    }
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            id={status}
            status={status}
            title={statusLabels[status]}
            tasks={items[status]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
