import { Controller, FieldValues, Path, Control } from 'react-hook-form'
import Input, { InputProps } from '@/components/ui/Input'
import Select, { SelectProps } from '@/components/ui/Select'

// Generic FormInput
interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'name'> {
  name: Path<T>
  control: Control<T>
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input {...rest} {...field} error={fieldState.error?.message} />
      )}
    />
  )
}

// Generic FormSelect
interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'name'> {
  name: Path<T>
  control: Control<T>
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  ...rest
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select {...rest} {...field} error={fieldState.error?.message} />
      )}
    />
  )
}
