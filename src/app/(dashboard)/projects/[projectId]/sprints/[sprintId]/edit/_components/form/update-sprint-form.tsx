'use client';

import { DateField } from '@/components/form/date';
import { InputField } from '@/components/form/input';
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
import Link from 'next/link';
import { useUpdateSprint } from '../../_hooks/useUpdateSprints';

export function UpdateSprintForm({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}) {
  const { form, handleSubmit, isLoading } = useUpdateSprint(
    sprintId,
    projectId,
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-screen justify-center items-center"
    >
      <Card className="border-0 shadow-none min-w-[400px]">
        <CardHeader className="pt-6 pb-4">
          <CardTitle>Edit Sprint</CardTitle>
          <CardDescription>Edit details for your sprint.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup className="grid grid-cols-1 gap-4">
            <InputField
              name="title"
              label="Sprint Title"
              placeholder="e.g. Mobile App Development"
              control={form.control}
            />
            <DateField
              name="startDate"
              label="Start Date"
              control={form.control}
            />
            <DateField name="endDate" label="End Date" control={form.control} />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-row gap-2 p-4 pt-2">
          <Link
            href={`/projects/${projectId}/sprints`}
            className={buttonVariants({
              variant: 'outline',
              className: 'flex-1',
            })}
          >
            Cancel
          </Link>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Sprint'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
