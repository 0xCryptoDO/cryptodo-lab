import { ReactNode } from 'react';

import { ButtonProps } from '@/components/atoms/Button/button.types';

export interface ScanButtonProps extends ButtonProps {
  link: string;
  icon: ReactNode;
}
