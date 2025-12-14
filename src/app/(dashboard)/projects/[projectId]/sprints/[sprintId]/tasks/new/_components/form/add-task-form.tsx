'use client';

import { CheckboxField } from '@/components/form/checkbox';
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
import { TaskPriority, TaskStatus } from '@/constants/enums';
import { useAddTask } from '../../_hooks/use-add-task';

interface TaskFormProps {
  sprintId: string;
  projectId: string;
}

export function AddTaskForm({ sprintId, projectId }: TaskFormProps) {
  const { form, handleSubmit, isLoading, users } = useAddTask(
    projectId,
    sprintId,
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 shadow-none">
        <CardHeader className="pt-6 pb-4">
          <CardTitle>Add Task</CardTitle>
          <CardDescription>
            Fill in the details for your new task.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <InputField
              name="title"
              label="Title"
              placeholder="e.g. Fix login bug"
              control={form.control}
              className="col-span-2"
            />

            {/* Description */}
            <TextareaField
              name="description"
              label="Description"
              placeholder="Describe the task..."
              control={form.control}
              className="col-span-2"
            />

            {/* Assignees */}
            <CheckboxField
              name="assignees"
              label="Assignee"
              control={form.control}
              options={users.map((user) => ({
                value: user._id,
                label: user.name,
              }))}
              className="col-span-2"
            />

            {/* Estimate */}
            <InputField
              name="estimate"
              label="Estimate (hours)"
              type="number"
              placeholder="e.g. 8"
              control={form.control}
              transformValue={(v) => (v ? Number(v) : undefined)}
            />

            {/* Priority */}
            <SelectField
              name="priority"
              label="Priority"
              control={form.control}
              options={[
                { value: TaskPriority.LOW, label: 'Low' },
                { value: TaskPriority.MEDIUM, label: 'Medium' },
                { value: TaskPriority.HIGH, label: 'High' },
              ]}
            />

            {/* Status */}
            <SelectField
              name="status"
              label="Status"
              control={form.control}
              options={[
                { value: TaskStatus.TODO, label: 'To Do' },
                { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
                { value: TaskStatus.REVIEW, label: 'Review' },
                { value: TaskStatus.DONE, label: 'Done' },
              ]}
            />

            {/* Due Date */}
            <DateField name="dueDate" label="Due Date" control={form.control} />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-row gap-2 p-4 pt-2">
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Task'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
