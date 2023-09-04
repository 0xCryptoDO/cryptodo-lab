import { CSS } from '@stitches/react';
import { ReactNode } from 'react';

export interface SelectProps {
  children?: ReactNode;
  items: {
    label: string | ReactNode;
    value: string;
    disabled?: boolean;
  }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  noBorder?: boolean;
  css?: CSS;
}
