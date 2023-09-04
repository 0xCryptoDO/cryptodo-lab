import { ChangeEvent, ReactNode } from 'react';

export interface TextAreaProps {
  value?: string | number;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  label?: ReactNode;
  popover?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  addonAfter?: ReactNode;
  addonAfterClick?: () => void;
  addonBefore?: ReactNode;
  addonBeforeClick?: () => void;
  disabled?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  // FIXME fix type
  error?: any;
}
