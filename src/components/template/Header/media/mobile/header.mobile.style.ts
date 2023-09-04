import { styled } from '@/styles';

import { Navigation, Space } from '@/components/styled';

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  zIndex: 10,
  top: 0,
  right: 0,
  left: 0,
  height: 72,
  padding: '0 32px 0 18px',
  backgroundColor: '$white',
  boxShadow: '0 4px 4px rgba(2, 6, 74, 0.02)',
  transition: '0.3s ease-in-out',

  '& > div': {
    '&:last-child': {
      display: 'flex',
      alignItems: 'center',
    },
    '&:nth-child(2) > svg': {
      width: 50,
    },
  },

  variants: {
    isOpened: {
      true: {
        [`& ${Navigation}`]: {
          top: 72,
          opacity: 1,
          visibility: 'visible',
        },
      },
    },
  },
});

export const ConnectWrapper = styled(Space, {});

export const Toggle = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 20,
  padding: 0,
  position: 'relative',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  '&::after, &::before': {
    content: '',
    position: 'absolute',
    right: 0,
    left: 0,
    height: 2,
    backgroundColor: '$textDark',
    borderRadius: 100,
  },
  '&::after': {
    top: 0,
    transition: 'top 0.2s 0.2s ease-in-out, transform 0.2s ease-in-out',
  },
  '&::before': {
    bottom: 0,
    transition: 'bottom 0.2s 0.2s ease-in-out, transform 0.2s ease-in-out;',
  },

  '& > span': {
    display: 'block',
    width: '100%',
    height: 2,
    backgroundColor: '$textDark',
    borderRadius: 100,
    transition: '0s 0.2s ease-in-out',
  },

  variants: {
    isOpened: {
      true: {
        '&::after': {
          top: 9,
          transform: 'rotate(45deg)',
          transition: 'top 0.2s ease-in-out, transform 0.2s 0.2s ease-in-out',
        },
        '&::before': {
          bottom: 9,
          transform: 'rotate(-45deg)',
          transition:
            'bottom 0.2s ease-in-out, transform 0.2s 0.2s ease-in-out',
        },
        '& > span': {
          opacity: 0,
        },
      },
    },
  },
});

export const Beta = styled('div', {
  opacity: 0.3,
  marginLeft: '.5rem',
  color: '$textDark',
  fontSize: '.75rem',
});

export const LanguageAndTheme = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const LogoClick = styled('button', {
  background: 'none',
  border: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
});
