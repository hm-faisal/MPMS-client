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
import { UserRole } from '@/constants/enums'; // assuming this matches your enum
import type { User } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

// Optional: Helper to format role display
const formatRole = (role: string): string => {
  return role
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Optional: Map role to badge variant
const getRoleVariant = (role: string) => {
  switch (role) {
    case UserRole.ADMIN:
      return 'destructive';
    case UserRole.MANAGER:
      return 'default';
    default:
      return 'outline';
  }
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="hover:bg-transparent"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge variant={getRoleVariant(role)} className="whitespace-nowrap">
          {formatRole(role)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => {
      const dept = row.getValue('department') as string | null;
      return dept ? (
        <span className="text-muted-foreground">{dept}</span>
      ) : (
        <span className="text-muted-foreground italic">—</span>
      );
    },
  },
  {
    accessorKey: 'skills',
    header: 'Skills',
    cell: ({ row }) => {
      const skills = row.getValue('skills') as string[] | undefined;
      if (!skills || skills.length === 0) {
        return <span className="text-muted-foreground italic">—</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{skills.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="hover:bg-transparent"
      >
        Joined
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return (
        <div className="text-muted-foreground text-sm">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() => navigator.clipboard.writeText(user._id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${user._id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/users/${user._id}/edit`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit User
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteConfirmationDialog
                title={`Delete user "${user.name}"?`}
                description="This action cannot be undone. All associated data may be affected."
                onConfirm={async () => {
                  // await deleteUser(user._id);
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete User
                </Button>
              </DeleteConfirmationDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
