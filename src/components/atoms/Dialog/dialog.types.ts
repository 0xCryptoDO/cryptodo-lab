import { CSS } from '@stitches/react';
import { ReactNode } from 'react';

export interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  children?: ReactNode;
  title?: string;
  content?: ReactNode;
  cancel?: ReactNode;
  action?: ReactNode;
  trigger?: ReactNode;
  closeIcon?: boolean;
  css?: CSS;
  className?: string;
}
