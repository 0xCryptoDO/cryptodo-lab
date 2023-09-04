import { FC } from 'react';

import { Navigation } from '@/components';

import { SidebarProps } from './sidebar.types';
import * as S from './sidebar.style';

export const Sidebar: FC<SidebarProps> = ({
  isOpened,
  setIsOpened,
  isTransition,
}) => {
  const toggleNav = () => {
    setIsOpened((prevState) => {
      const newState = !prevState;

      localStorage.setItem('sidebarOpened', `${newState}`);
      return newState;
    });
  };

  return (
    <S.Sidebar isClosed={!isOpened} isTransition={isTransition}>
      <Navigation navOpened={isOpened} toggleNav={toggleNav} />
    </S.Sidebar>
  );
};
