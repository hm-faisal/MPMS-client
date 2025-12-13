import { cn } from '@/lib/utils';
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

// ✅ Infer T from `name` + `control` — no need to pass full T manually
interface InputFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>; // ✅ Better than Path<T>
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  transformValue?: (value: string) => unknown;
  placeholder: string;
  autoComplete?: string;
  control: Control<TFieldValues>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const InputField = <TFieldValues extends FieldValues>({
  name,
  label,
  type,
  transformValue,
  placeholder,
  autoComplete = 'on',
  control,
  className,
  labelClassName,
  inputClassName,
}: InputFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn('w-full', className)}
        >
          <FieldLabel htmlFor={name} className={cn('text-sm', labelClassName)}>
            {label}
          </FieldLabel>
          <Input
            {...field}
            type={type}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(transformValue ? transformValue(value) : value);
            }}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={cn('w-full', inputClassName)}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
