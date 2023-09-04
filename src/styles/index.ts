import { createStitches } from '@stitches/react';

import setupFonts from './fonts';
import setupStyles from './global';

export const { getCssText, styled, css, createTheme } = createStitches({
  theme: {
    colors: {
      background: '#F5F5F5',
      white: '#FFFFFF',
      primary: '#2565E9',
      buttonPrimary: '#2565E9',
      primaryOpacity: 'rgba(37, 101, 233, 0.06)',
      primarySelected: '#1D53CD',
      green: '#30BE7A',
      greenOpacity: 'rgba(48, 190, 122, 0.12)',
      yellow: '#F3BA2F',
      yellowOpacity: 'rgba(243, 186, 47, 0.12)',
      grey: '#EBECEF',
      greySecondary: '#F9F9F9',
      greyTertiary: '#F0F0F3',
      greyQuaternary: '#F4F5F7',
      border: '#E6E7EB',
      text: '#FFFFFF',
      textOpacity: 'rgba(1, 5, 4, 0.4)',
      textDark: '#28293B',
      red: '#E74342',
      redOpacity: '#f3d1d1',
      darkblue: '#202031',
      sidebar: '#2565E9',
      dialog: '#FFFFFF',
      dropdown: '#FFFFFF',
      stepBg: '#F5F7FB',
      stepColor: 'rgba(40, 41, 59, 0.4)',
      purple: 'rgba(159, 80, 195, 1)',
      purpleOpacity: 'rgba(159, 80, 195, 0.06)',
    },
    fonts: {
      inter: 'Inter, sans-serif',
    },
    radii: {
      default: '8px',
    }
  },
  media: {
    mobile: 'only screen and (max-width: 550px)',
    tablet: 'only screen and (max-width: 769px)',
    fromTablet: 'only screen and (min-width: 769px)',
    laptop: 'only screen and (min-width: 769px) and (max-width: 1024px)',
  },
});

export const darkTheme = createTheme({
  colors: {
    background: '#1e1e2c',
    white: '#11111e',
    primary: '#2565E9',
    buttonPrimary: '#0439a2',
    primaryOpacity: 'rgba(37, 101, 233, 0.06)',
    primarySelected: '#1D53CD',
    green: '#30BE7A',
    greenOpacity: 'rgba(48, 190, 122, 0.12)',
    grey: '#EBECEF',
    greySecondary: '#202031',
    greyTertiary: '#1D1D2E',
    greyQuaternary: '#1D1D2E',
    border: 'rgba(230, 231, 235, 0.12)',
    text: '#FFFFFF',
    textOpacity: 'rgba(255, 255, 255, 0.4)',
    textDark: '#FFFFFF',
    red: '#E74342',
    darkblue: '#202031',
    sidebar: '#151523',
    dialog: '#28293B',
    dropdown: '#202031',
  },
});

export const setupGlobalStyles = () => {
  setupFonts();
  setupStyles();
};

export const Main = styled('main', {
  width: '95%',
  margin: '0 auto',
  padding: '128px 0 48px 100px',
  '@tablet': {
    width: '92%',
    paddingTop: 112,
    paddingLeft: 0,
  },

  variants: {
    isTransition: {
      true: {
        transition: '0.3s ease-in-out',
      },
    },
    isSidebarOpened: {
      true: {
        paddingLeft: 250,

        '@tablet': {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
  },
});
