import { CSS } from '@stitches/react';
import { ChangeEvent, ReactNode } from 'react';

export interface NumberInputProps {
  css?: CSS;
  value?: number;
  getValue?: () => number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleButtonChange?: (value: number) => void;
  min?: number | string;
  max?: number | string;
  label?: ReactNode;
  popover?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  noButtons?: boolean;
  placeholder?: string;
  // FIXME fix type
  error?: any;
}
