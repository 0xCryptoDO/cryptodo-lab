import { ReactNode } from 'react';

export interface BadgeProps {
  color: 'green' | 'yellow' | 'blue' | 'purple';
  children: ReactNode;
}
