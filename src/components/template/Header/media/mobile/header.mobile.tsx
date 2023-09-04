import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { LOCALES } from '@/locales';
import { LogoIcon } from '@/assets/icons';
import { Navigation, Select, ThemeSwitcher } from '@/components';

import { HeaderMobileProps } from './header.mobile.types';

import * as S from './header.mobile.style';

export const HeaderMobile: FC<HeaderMobileProps> = ({
  isOpened,
  logout,
  toggleOpened,
}) => {
  const { t, lang } = useTranslation('common');
  const { asPath, push } = useRouter();

  const pushDashboard = () => {
    if (asPath !== '/') {
      push('/');
    }
  };

  return (
    <S.Header isOpened={isOpened}>
      <div>
        <S.Toggle
          isOpened={isOpened}
          type="button"
          aria-label={t(`navigation.${isOpened ? 'closeNav' : 'openNav'}`)}
          onClick={toggleOpened}
        >
          <span />
        </S.Toggle>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <S.LogoClick onClick={pushDashboard}>
          <LogoIcon />
        </S.LogoClick>
        <S.Beta>Beta</S.Beta>
      </div>
      <S.LanguageAndTheme>
        <ThemeSwitcher />
        <div>
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
          </S.ConnectWrapper>
        </div>
      </S.LanguageAndTheme>
      <Navigation logout={logout} mobile navOpened={isOpened} toggleNav={toggleOpened} />
    </S.Header>
  );
};
