'use client';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Sprint } from '@/types';
import {
  Calendar,
  CheckCircle2,
  Circle,
  List,
  Pencil,
  Plus,
  Timer,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const getTaskStatusIcon = (status: string) => {
  switch (status) {
    case 'To Do':
      return <Circle className="h-4 w-4" />;
    case 'In Progress':
      return <Timer className="h-4 w-4" />;
    case 'Done':
      return <CheckCircle2 className="h-4 w-4" />;
    default:
      return <Circle className="h-4 w-4" />;
  }
};

const getTaskStatusColor = (status: string) => {
  switch (status) {
    case 'To Do':
      return 'text-muted-foreground';
    case 'In Progress':
      return 'text-chart-1';
    case 'Done':
      return 'text-chart-4';
    default:
      return 'text-muted-foreground';
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

export default function SprintDetailsPage({
  sprint,
  projectId,
}: {
  sprint: Sprint;
  projectId: string;
}) {
  const router = useRouter();
  const totalEstimate = sprint.tasks.reduce(
    (sum, task) => sum + (task.estimate || 0),
    0,
  );
  const completedTasks = sprint.tasks.filter(
    (task) => task.status === 'Done',
  ).length;
  const inProgressTasks = sprint.tasks.filter(
    (task) => task.status === 'In Progress',
  ).length;
  const todoTasks = sprint.tasks.filter(
    (task) => task.status === 'To Do',
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/projects/${projectId}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to project
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="group space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-balance font-sans text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
                  {sprint.title}
                </h1>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Sprint
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                </Badge>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-xl font-medium text-foreground">
                  Tasks
                </h2>
                <div>
                  <Link
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                    href={`/projects/${projectId}/sprints/${sprint._id}/tasks/new`}
                  >
                    <Plus className="h-4 w-4" />
                    Add Task
                  </Link>
                  <Link
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                    href={`/projects/${projectId}/sprints/${sprint._id}/tasks`}
                  >
                    <List className="h-4 w-4" />
                    All Tasks
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                {sprint.tasks.map((task) => (
                  <Link
                    key={task._id}
                    href={`/projects/${projectId}/sprints/${sprint._id}/tasks/${task._id}`}
                    className="group block"
                  >
                    <Card className="p-5 transition-all hover:border-foreground/20">
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 ${getTaskStatusColor(task.status)}`}
                        >
                          {getTaskStatusIcon(task.status)}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="font-sans text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                                {task.title}
                              </h3>
                              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                                {task.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              type="button"
                              variant="ghost"
                              className="gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/projects/${projectId}/sprints/${sprint._id}/tasks/${task._id}/update`,
                                );
                              }}
                            >
                              View Details
                            </Button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <Badge
                              variant="outline"
                              className={getPriorityColor(task.priority)}
                            >
                              {task.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.status}
                            </Badge>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{task.estimate}h estimate</span>
                              <span>•</span>
                              <span>Due {formatDate(task.dueDate)}</span>
                              {task.assignees && task.assignees.length > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{task.assignees.length} assignees</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6 font-sans text-lg font-medium text-foreground">
                Sprint Overview
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Tasks</span>
                    <span className="font-medium text-foreground">
                      {sprint.tasks.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium text-chart-4">
                      {completedTasks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">In Progress</span>
                    <span className="font-medium text-chart-1">
                      {inProgressTasks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">To Do</span>
                    <span className="font-medium text-muted-foreground">
                      {todoTasks}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Total Estimate
                    </span>
                    <span className="font-medium text-foreground">
                      {totalEstimate}h
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Progress
                  </p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-chart-4 transition-all"
                      style={{
                        width: `${(completedTasks / sprint.tasks.length) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {Math.round((completedTasks / sprint.tasks.length) * 100)}%
                    complete
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-muted bg-muted/30 p-6">
              <h4 className="mb-2 font-sans text-sm font-medium text-foreground">
                Sprint Duration
              </h4>
              <p className="text-2xl font-semibold text-foreground">
                {Math.ceil(
                  (new Date(sprint.endDate).getTime() -
                    new Date(sprint.startDate).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{' '}
                days
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                From start to end
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
