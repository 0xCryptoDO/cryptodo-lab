import { TooltipProps as TooltipPrimitiveProps } from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

export interface TooltipProps extends TooltipPrimitiveProps {
  children: ReactNode;
  content: ReactNode;
}
