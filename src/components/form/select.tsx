// components/ui/select-field.tsx

import { cn } from '@/lib/utils';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: SelectOption[];
  control: Control<T>;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export const SelectField = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  control,
  className,
  labelClassName,
  selectClassName,
}: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn('w-full', className)}>
          <FieldLabel htmlFor={name} className={cn('text-sm', labelClassName)}>
            {label}
          </FieldLabel>
          <select
            {...field}
            id={name}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              selectClassName,
            )}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
