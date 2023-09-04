import { FC } from 'react';
import { useEthers } from "@usedapp/core";

import { useTypedDispatch } from '@/reduxStore';
import { removeToken } from '@/reduxStore/slices/auth/authSlice';

import { ConnectWalletDialog } from './components';
import { HeaderDesktop, HeaderMobile } from './media';
import { HeaderProps } from './header.types';

export const Header: FC<HeaderProps> = ({
  isOpened,
  setIsOpened,
  isDesktop,
}) => {
  const dispatch = useTypedDispatch();
  const { deactivate } = useEthers();
  
  const toggleOpened = () => {
    setIsOpened((prevState) => {
      const newState = !prevState;

      if (newState) {
        document.querySelector('body')?.classList.add('overflow-hidden');

        return newState;
      }

      document.querySelector('body')?.classList.remove('overflow-hidden');

      return newState;
    });
  };

  const logout = () => {
    deactivate();
    dispatch(removeToken());
  }

  return (
    <>
      <ConnectWalletDialog />
      {isDesktop ? (
        <HeaderDesktop logout={logout} />
      ) : (
        <HeaderMobile logout={logout} isOpened={isOpened} toggleOpened={toggleOpened} />
      )}
    </>
  );
};
