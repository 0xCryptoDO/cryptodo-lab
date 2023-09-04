import { CSS } from '@stitches/react';
import { ReactNode } from 'react';

export interface DropdownItem {
  icon?: ReactNode;
  label: string;
  action: () => void;
}

export interface DropdownProps {
  children: ReactNode;
  items: DropdownItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  css?: CSS;
}
