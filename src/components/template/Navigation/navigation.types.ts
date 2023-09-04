import { CSS } from '@stitches/react';
import { ReactElement } from 'react';

export interface LinkItem {
  isAuthorizedRoute?: boolean;
  href?: string;
  label: string;
  icon: ReactElement;
  activeUrls?: string[];
  alwaysDisabled?: boolean;
  query?: Record<string, string>;
  action?: () => void;
  css?: CSS;
  blank?: boolean;
}

export interface NavigationProps {
  logout?: () => void;
  mobile?: boolean;
  navOpened: boolean;
  toggleNav: () => void;
}
