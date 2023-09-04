import { UseFormReturn } from 'react-hook-form';

export interface CreateTokenFormProps {
  nameContract: string;
  allFieldsDisabled: boolean;
  form: UseFormReturn;
}

export interface VestingCalendarRow {
  date: number;
  percentage: number;
}
