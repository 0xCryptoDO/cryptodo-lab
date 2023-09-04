import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { ExitIcon } from '@radix-ui/react-icons';

import { shortenIfAddress, useEthers } from '@cryptodo/frontend-sdk';

import { LOCALES } from '@/locales';
import { LogoIcon } from '@/assets/icons';
import { Button, IdentIcon, Select, Space, ThemeSwitcher } from '@/components';
import { HeaderDesktopProps } from '@/components/template/Header/media/desktop/header.desktop.types';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleConnectDialog } from '@/reduxStore/slices/ui/ui.slice';

import * as S from './header.desktop.style';

export const HeaderDesktop: FC<HeaderDesktopProps> = ({ logout }) => {
  const { balance, iconId } = useTypedSelector((state) => state.user);
  const token = useTypedSelector((state) => state.auth.token);

  const dispatch = useTypedDispatch();
  const { account } = useEthers();
  const { t, lang } = useTranslation('common');
  const { asPath, push } = useRouter();

  const handleClick = () => {
    if (account) {
      if (asPath !== '/profile') {
        push('/profile');
      }
    } else {
      dispatch(toggleConnectDialog(true));
    }
  };

  const pushDashboard = () => {
    if (asPath !== '/') {
      push('/');
    }
  };

  return (
    <S.Header>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <S.LogoClick onClick={pushDashboard}>
          <LogoIcon />
        </S.LogoClick>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <S.Name onClick={pushDashboard} style={{ marginLeft: '8px' }}>
            CryptoDo
          </S.Name>
          <S.Beta onClick={pushDashboard}>Beta</S.Beta>
        </div>
      </div>
      <div>
        <ThemeSwitcher />
        <S.ConnectWrapper size="middle">
          <Select
            noBorder
            value={(asPath && lang) || undefined}
            onChange={(locale) => push(asPath, asPath, { locale })}
            items={LOCALES.map((locale) => ({
              value: locale,
              label: locale.toUpperCase(),
            }))}
          />
          <Space size="small">
            <Button
              onClick={handleClick}
              theme={account ? 'secondaryDark' : 'primary'}
            >
              {account && token ? (
                <Space align="center">
                  <IdentIcon id={iconId} />
                  {shortenIfAddress(account)}
                </Space>
              ) : (
                t('connectWallet')
              )}
            </Button>
            {typeof balance === 'number' && account && token ? (
              <Button theme="secondaryDark">{balance} CDO</Button>
            ) : null}
            {account && token && (
              <Button theme="secondaryDark" onClick={logout}>
                <ExitIcon />
                <span style={{ paddingLeft: '8px' }}>{t('exit')}</span>
              </Button>
            )}
          </Space>
        </S.ConnectWrapper>
      </div>
    </S.Header>
  );
};
