'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { TaskWithSprintUser } from '@/types';
import type { User as UserType } from '@/types/user';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Flag,
  Pencil,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getTaskData } from '../../_api/get-task';

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const formatDateTime = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'To Do':
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
    case 'In Progress':
      return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
    case 'Done':
      return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Medium':
      return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
    case 'Low':
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function TaskDetailsPage({ taskId }: { taskId: string }) {
  const router = useRouter();
  const [task, setTasks] = useState<TaskWithSprintUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const res = await getTaskData(taskId);
        setTasks(res.data);
      } catch (_error) {
        toast.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [taskId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Task not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={`/projects/${task.sprint.projectId._id}`}
            className="hover:text-foreground transition-colors"
          >
            {task.sprint.projectId.title}
          </Link>
          <span>/</span>
          <Link
            href={`/projects/${task.sprint.projectId._id}/sprints/${task.sprint._id}`}
            className="hover:text-foreground transition-colors"
          >
            {task.sprint.title}
          </Link>
          <span>/</span>
          <span className="text-foreground">Task Details</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="group space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-balance font-sans text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
                  {task.title}
                </h1>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/projects/${task.sprint.projectId._id}/sprints/${task.sprint._id}/tasks/${task._id}/update`,
                    );
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  Edit Task
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={getStatusColor(task.status)}
                >
                  {task.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={getPriorityColor(task.priority)}
                >
                  <Flag className="mr-1.5 h-3 w-3" />
                  {task.priority}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-sans text-xl font-medium text-foreground">
                Description
              </h2>
              <div className="prose prose-neutral max-w-none dark:prose-invert">
                <p className="whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Assignees */}
            <div className="space-y-4">
              <h2 className="font-sans text-xl font-medium text-foreground">
                Assignees
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {task.assignees.map((assignee: UserType) => (
                  <Card key={assignee._id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-muted p-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {assignee.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {assignee.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6 font-sans text-lg font-medium text-foreground">
                Task Details
              </h3>
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <p className="font-sans text-base text-foreground">
                      {task.status}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Priority
                    </p>
                    <p className="font-sans text-base text-foreground">
                      {task.priority}
                    </p>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Due Date
                    </p>
                    <p className="font-sans text-base text-foreground">
                      {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>

                {/* Estimate */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Estimate
                    </p>
                    <p className="font-sans text-base text-foreground">
                      {task.estimate} hours
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-muted bg-muted/30 p-6">
              <h4 className="mb-2 font-sans text-sm font-medium text-foreground">
                Sprint
              </h4>
              <Link
                href={`/projects/${task.sprint.projectId._id}/sprints/${task.sprint._id}`}
                className="block text-foreground hover:text-foreground/80 transition-colors"
              >
                <p className="text-base font-medium">{task.sprint.title}</p>
              </Link>
            </Card>

            <Card className="border-muted bg-muted/30 p-6">
              <h4 className="mb-2 font-sans text-sm font-medium text-foreground">
                Created
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(task.createdAt)}
              </p>
              <h4 className="mb-2 mt-4 font-sans text-sm font-medium text-foreground">
                Last Updated
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(task.updatedAt)}
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
