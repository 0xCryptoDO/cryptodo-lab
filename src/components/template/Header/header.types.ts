import { Dispatch, SetStateAction } from 'react';

export interface HeaderProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  isDesktop: boolean;
}
