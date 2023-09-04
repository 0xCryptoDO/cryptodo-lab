import { FC } from 'react';
import { useTheme } from 'next-themes';

import {
  DarkThemeIcon,
  LightThemeIcon,
  SystemThemeIcon,
} from '@/assets/icons/theme';

import * as S from './themeSwitcher.style';

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () => {
    if (theme === 'light') {
      setTheme('dark');

      return;
    }

    if (theme === 'dark') {
      setTheme('system');

      return;
    }

    if (theme === 'system') {
      setTheme('light');
    }
  };

  return (
    <S.ThemeSwitcher
      type="button"
      onClick={handleSetTheme}
      data-theme={theme as 'light' | 'system' | 'dark'}
    >
      <S.Light className="light">
        <LightThemeIcon />
      </S.Light>
      <S.System className="system">
        <SystemThemeIcon />
      </S.System>
      <S.Dark className="dark">
        <DarkThemeIcon />
      </S.Dark>
    </S.ThemeSwitcher>
  );
};
