// components/ui/textarea-field.tsx

import { cn } from '@/lib/utils';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

interface TextareaFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
}

export const TextareaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  className,
  labelClassName,
  textareaClassName,
}: TextareaFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn('w-full', className)}>
          <FieldLabel htmlFor={name} className={cn('text-sm', labelClassName)}>
            {label}
          </FieldLabel>
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            className={cn('min-h-20', textareaClassName)}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
