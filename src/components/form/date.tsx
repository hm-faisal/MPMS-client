// components/ui/date-field.tsx

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  className?: string;
  labelClassName?: string;
}

export const DateField = <T extends FieldValues>({
  name,
  label,
  control,
  className,
  labelClassName,
}: DateFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn('w-full', className)}>
          <FieldLabel htmlFor={name} className={cn('text-sm', labelClassName)}>
            {label}
          </FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )}
              >
                {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
