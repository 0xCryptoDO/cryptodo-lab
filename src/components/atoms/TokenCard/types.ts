import { ReactNode } from 'react';

export interface TokenCardProps {
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  logo: ReactNode;
  name: string;
  popover?: string;
  horizontal?: boolean;
}
