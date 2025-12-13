import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Sprint, Task, User as UserType } from '@/types';
import { calculateDays, formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/format-currency';
import {
  Calendar,
  CheckCircle2,
  Circle,
  DollarSign,
  List,
  Plus,
  Timer,
  TrendingUp,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectData } from './_api/getProject';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
    case 'Completed':
      return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
    case 'On Hold':
      return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
    case 'Cancelled':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'text-destructive';
    case 'Medium':
      return 'text-chart-2';
    case 'Low':
      return 'text-muted-foreground';
    default:
      return 'text-muted-foreground';
  }
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectData(projectId);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-balance font-sans text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
                {project.title}
              </h1>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={getStatusColor(project.status)}
                >
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Thumbnail */}
            {project.thumbnail && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                  src={project.thumbnail || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-sans text-xl font-medium text-foreground">
                Project Overview
              </h2>
              <div className="prose prose-neutral max-w-none dark:prose-invert">
                <p className="whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-sans text-xl font-medium text-foreground">
                Team Members
              </h2>
              {project.members.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.members.map((member: UserType) => (
                    <Card key={member._id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted p-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {member.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6">
                  <p className="text-center text-sm text-muted-foreground">
                    No team members assigned yet
                  </p>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-xl font-medium text-foreground">
                  Sprints
                </h2>
                <div>
                  <Link
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                    href={`/projects/${projectId}/sprints/new`}
                  >
                    <Plus className="h-4 w-4" />
                    Add Sprint
                  </Link>
                  <Link
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                    href={`/projects/${projectId}/sprints`}
                  >
                    <List className="h-4 w-4" />
                    All Sprints
                  </Link>
                </div>
              </div>
              {project.sprints.length > 0 ? (
                <div className="space-y-4">
                  {project.sprints.map((sprint: Sprint) => (
                    <Card
                      key={sprint._id}
                      className="group p-6 transition-all hover:border-foreground/20"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-sans text-lg font-medium text-foreground">
                                {sprint.title}
                              </h3>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {formatDate(new Date(sprint.startDate))} -{' '}
                              {formatDate(new Date(sprint.endDate))}
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <Badge variant="outline">
                              {sprint.tasks.length} tasks
                            </Badge>
                            <Link
                              className={cn(
                                buttonVariants({
                                  variant: 'ghost',
                                  size: 'sm',
                                }),
                              )}
                              href={`/projects/${projectId}/sprints/${sprint._id}`}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>

                        {sprint.tasks.length > 0 && (
                          <div className="mt-4 space-y-2 border-t border-border pt-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-foreground">
                                Tasks
                              </h4>
                            </div>
                            <div className="space-y-2">
                              {sprint.tasks.map((task: Task) => (
                                <div
                                  key={task._id}
                                  className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3"
                                >
                                  <div className="mt-0.5">
                                    {getTaskStatusIcon(task.status)}
                                  </div>
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="font-medium text-foreground">
                                        {task.title}
                                      </p>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${getPriorityColor(task.priority)}`}
                                      >
                                        {task.priority}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {task.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>Status: {task.status}</span>
                                      <span>•</span>
                                      <span>Estimate: {task.estimate}h</span>
                                      <span>•</span>
                                      <span>
                                        Due:{' '}
                                        {formatDate(new Date(task.dueDate))}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6">
                  <p className="text-center text-sm text-muted-foreground">
                    No sprints created yet
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6 font-sans text-lg font-medium text-foreground">
                Project Details
              </h3>
              <div className="space-y-6">
                {/* Client */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Client
                    </p>
                    <p className="font-sans text-base text-foreground">
                      {project.client}
                    </p>
                  </div>
                </div>

                {/* Budget */}
                {project.budget && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-muted p-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Budget
                      </p>
                      <p className="font-sans text-base text-foreground">
                        {formatCurrency(project.budget)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <p className="font-sans text-base text-foreground">
                      {project.status}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Timeline
                    </p>
                    <p className="font-sans text-sm text-foreground">
                      {formatDate(project.startDate)}
                    </p>
                    <p className="text-sm text-muted-foreground">to</p>
                    <p className="font-sans text-sm text-foreground">
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Info Card */}
            <Card className="border-muted bg-muted/30 p-6">
              <h4 className="mb-2 font-sans text-sm font-medium text-foreground">
                Project Duration
              </h4>
              <p className="text-2xl font-semibold text-foreground">
                {calculateDays(project.startDate, project.endDate)} days
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                From start to completion
              </p>
            </Card>

            <Card className="border-muted bg-muted/30 p-6">
              <h4 className="mb-2 font-sans text-sm font-medium text-foreground">
                Sprint Progress
              </h4>
              <p className="text-2xl font-semibold text-foreground">
                {project.sprints.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Total sprints
              </p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {project.sprints.reduce(
                    (acc: number, sprint: Sprint) => acc + sprint.tasks.length,
                    0,
                  )}{' '}
                  total tasks
                </p>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
