import { cn } from '@/lib/utils';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Field, FieldError, FieldLabel } from '../ui/field';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: CheckboxOption[];
  control: Control<T>;
  className?: string;
  labelClassName?: string;
  itemClassName?: string;
}

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  options,
  control,
  className,
  labelClassName,
  itemClassName = 'flex items-center space-x-2',
}: CheckboxGroupFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedValues: string[] = Array.isArray(field.value)
          ? field.value
          : [];

        const handleCheckedChange = (optionValue: string, checked: boolean) => {
          const newValues = checked
            ? [...selectedValues, optionValue]
            : selectedValues.filter((v) => v !== optionValue);

          field.onChange(newValues);
        };

        return (
          <Field className={cn('w-full', className)}>
            <FieldLabel className={cn('text-sm', labelClassName)}>
              {label}
            </FieldLabel>
            <div className="space-y-2 mt-1">
              {options.map((option) => {
                const isChecked = selectedValues.includes(option.value);
                return (
                  <div key={option.value} className={itemClassName}>
                    <Checkbox
                      id={`${name}-${option.value}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCheckedChange(option.value, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`${name}-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
