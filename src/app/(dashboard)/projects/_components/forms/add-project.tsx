'use client';

import { DateField } from '@/components/form/date';
import { InputField } from '@/components/form/input';
import { SelectField } from '@/components/form/select';
import { TextareaField } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { ProjectStatus } from '@/constants/enums';
import { useCreateProject } from '../../_hooks/useCreateProject';

export function AddProjectForm() {
  const { form, handleSubmit, isLoading } = useCreateProject();

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 shadow-none">
        <CardHeader className="pt-6 pb-4">
          <CardTitle>Add Project</CardTitle>
          <CardDescription>
            Fill in the details for your new project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="title"
              label="Project Title"
              placeholder="e.g. Mobile App Development"
              control={form.control}
              className="col-span-2"
            />
            <TextareaField
              name="description"
              label="Description"
              placeholder="Brief project description"
              control={form.control}
              className="col-span-2"
            />
            <InputField
              name="client"
              label="Client"
              placeholder="e.g. Tech Startup Inc"
              control={form.control}
            />
            <InputField
              name="thumbnail"
              label="Thumbnail URL (optional)"
              placeholder="https://example.com/image.jpg"
              control={form.control}
            />
            <InputField
              name="budget"
              label="Budget (optional)"
              type="number"
              placeholder="e.g. 100000"
              control={form.control}
              transformValue={(v) => (v ? Number(v) : undefined)}
            />
            <SelectField
              name="status"
              label="Status"
              control={form.control}
              options={[
                { value: ProjectStatus.PLANNED, label: 'Planned' },
                { value: ProjectStatus.ACTIVE, label: 'Active' },
                { value: ProjectStatus.COMPLETED, label: 'Completed' },
                { value: ProjectStatus.ARCHIVED, label: 'Archived' },
              ]}
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
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Project'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
