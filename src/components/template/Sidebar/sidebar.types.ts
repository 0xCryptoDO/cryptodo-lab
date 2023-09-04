import { Dispatch, SetStateAction } from 'react';

export interface SidebarProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  isTransition: boolean;
}
