import { CSS } from '@stitches/react';
import { ChangeEvent, ReactNode } from 'react';

export interface InputProps {
  css?: CSS
  value?: string | number;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  label?: ReactNode;
  popover?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: any) => void;
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
