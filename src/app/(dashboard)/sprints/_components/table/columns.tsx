import { deleteSprint } from '@/app/(dashboard)/projects/[projectId]/sprints/_api/deleteSprint';
import { DeleteConfirmationDialog } from '@/components/dialog/deleteConfirm';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Sprint } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Sprint>[] = [
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
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('title')}</div>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(
        row.getValue('startDate') as string,
      ).toLocaleDateString();
      return <div>{date}</div>;
    },

    enableGlobalFilter: true,
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(
        row.getValue('endDate') as string,
      ).toLocaleDateString();
      return <div>{date}</div>;
    },
    enableGlobalFilter: true,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const sprint = row.original;

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
              onClick={() => navigator.clipboard.writeText(sprint._id)}
            >
              Copy sprint ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/projects/${sprint.projectId}/sprints/${sprint._id}`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-center"
                >
                  View details
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/projects/${sprint.projectId}/sprints/${sprint._id}/edit`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-center"
                >
                  Edit sprint
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteConfirmationDialog
                title={`Delete "${sprint.title}"?`}
                description="This sprint will be removed from the project"
                onConfirm={async () => await deleteSprint(sprint._id)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-center"
                >
                  Delete sprint
                </Button>
              </DeleteConfirmationDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
