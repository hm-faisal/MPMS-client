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
import { deleteTask } from '../../_api/deleteTask';

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
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Due Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('dueDate') as string);
      return <div>{date.toLocaleDateString()}</div>;
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
                href={`/projects/${task.sprint.projectId}/sprints/${task.sprint._id}/tasks/${task._id}`}
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="w-full text-center"
                >
                  <Eye className="h-4 w-4" />
                  View details
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/projects/${task.sprint.projectId}/sprints/${task.sprint._id}/tasks/${task._id}/update`}
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="w-full text-center"
                >
                  <Pencil className="h-4 w-4" />
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
                  className="w-full text-center"
                >
                  <Trash className="h-4 w-4" />
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
