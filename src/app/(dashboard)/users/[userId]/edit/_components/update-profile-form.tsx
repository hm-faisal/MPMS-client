// app/(dashboard)/users/[id]/edit/components/UpdateUserForm.tsx
'use client';

import { InputField } from '@/components/form/input';
import { SelectField } from '@/components/form/select';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { UserRole } from '@/constants/enums';
import Link from 'next/link';
import { useUpdateUser } from '../_hooks/use-update-user';

export const getUserRoleOptions = () => {
  return Object.values(UserRole).map((role) => ({
    label: role
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: role,
  }));
};

export function UpdateUserForm({ userId }: { userId: string }) {
  const { form, handleSubmit, isLoading } = useUpdateUser(userId);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-screen justify-center items-center"
    >
      <Card className="border-0 shadow-none min-w-[400px]">
        <CardHeader className="pt-6 pb-4">
          <CardTitle>Edit User</CardTitle>
          <CardDescription>
            Update user details and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup className="grid grid-cols-1 gap-4">
            <InputField
              name="name"
              label="Full Name"
              placeholder="e.g. John Doe"
              control={form.control}
            />

            <InputField
              name="email"
              label="Email Address"
              placeholder="e.g. john@example.com"
              control={form.control}
              type="email"
            />

            {/* Role Select */}
            <SelectField
              name="role"
              label="Role"
              placeholder="Select a role"
              options={getUserRoleOptions()}
              control={form.control}
            />

            <InputField
              name="department"
              label="Department (Optional)"
              placeholder="e.g. Engineering, Marketing"
              control={form.control}
            />

            <InputField
              name="skills"
              label="Skills (Optional)"
              placeholder="e.g. React, Node.js"
              control={form.control}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-row gap-2 p-4 pt-2">
          <Link
            href="/users"
            className={buttonVariants({
              variant: 'outline',
              className: 'flex-1',
            })}
          >
            Cancel
          </Link>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update User'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
