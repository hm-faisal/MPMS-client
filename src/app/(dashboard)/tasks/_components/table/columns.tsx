import { deleteTask } from '@/app/(dashboard)/projects/[projectId]/sprints/[sprintId]/tasks/_api/deleteTask';
import { DeleteConfirmationDialog } from '@/components/dialog/deleteConfirm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskPriority, TaskStatus } from '@/constants/enums';
import type { TaskWithSprintUser } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

export const getPriorityVariant = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return 'destructive';
    case TaskPriority.MEDIUM:
      return 'default';
    default:
      return 'secondary';
  }
};

export const getStatusVariant = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return 'secondary';
    case TaskStatus.IN_PROGRESS:
      return 'default';
    case TaskStatus.REVIEW:
      return 'outline';
    case TaskStatus.DONE:
      return 'secondary';
    default:
      return 'secondary';
  }
};

// Accessors for nested fields (used in both display and filtering)
const getProjectName = (task: TaskWithSprintUser) =>
  task.sprint?.projectId?.title || '—';
const getSprintName = (task: TaskWithSprintUser) => task.sprint?.title || '—';
const getAssigneeName = (task: TaskWithSprintUser) =>
  task.assignees?.map((assignee) => assignee.name).join(', ') || 'Unassigned';

export const columns: ColumnDef<TaskWithSprintUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="hover:bg-transparent"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('title')}</div>
    ),
  },
  {
    id: 'project',
    header: 'Project',
    accessorFn: (row) => getProjectName(row),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {getProjectName(row.original)}
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      return filterValue.includes(row.getValue(id) as string);
    },
  },
  {
    id: 'sprint',
    header: 'Sprint',
    accessorFn: (row) => getSprintName(row),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {getSprintName(row.original)}
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      return filterValue.includes(row.getValue(id) as string);
    },
  },
  // ✅ Assignee
  {
    id: 'assignee',
    header: 'Assignee',
    accessorFn: (row) => getAssigneeName(row),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {getAssigneeName(row.original)}
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      return filterValue.includes(row.getValue(id) as string);
    },
  },
  {
    accessorKey: 'estimate',
    header: 'Estimate (h)',
    cell: ({ row }) => {
      const estimate = row.getValue('estimate') as number | null | undefined;
      return estimate ? `${estimate}h` : '—';
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as TaskPriority;
      const variant = getPriorityVariant(priority);
      return (
        <Badge variant={variant}>
          {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </Badge>
      );
    },
    // Enable multi-select filtering
    filterFn: (row, id, filterValue: string[]) => {
      return filterValue.includes(row.getValue(id) as string);
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as TaskStatus;
      const variant = getStatusVariant(status);
      return (
        <Badge variant={variant}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
      );
    },
    // Enable multi-select filtering
    filterFn: (row, id, filterValue: string[]) => {
      return filterValue.includes(row.getValue(id) as string);
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="hover:bg-transparent"
      >
        Due Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue('dueDate') as string;
      if (!dateStr) return '—';
      const date = new Date(dateStr);
      return date instanceof Date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString()
        : '—';
    },
    filterFn: (row, id, filterValue: string[]) => {
      return filterValue.includes(row.getValue(id) as string);
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task._id.toString())}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/projects/${task.sprint.projectId._id}/sprints/${task.sprint._id}/tasks/${task._id}`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/projects/${task.sprint.projectId._id}/sprints/${task.sprint._id}/tasks/${task._id}/update`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit task
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteConfirmationDialog
                title={`Delete "${task.title}"?`}
                description="This task will be removed from the sprint"
                onConfirm={async () => {
                  await deleteTask(task._id);
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete task
                </Button>
              </DeleteConfirmationDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
