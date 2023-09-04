import { FieldErrors } from '@/types/FormFieldErrors';

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  onBlur: () => void;
  disabled?: boolean;
  errorMessage?: string | null;
  error?: FieldErrors | undefined;
  label?: boolean;
  popover?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showTimeInput?: boolean;
  dateFormat?: string;
}
