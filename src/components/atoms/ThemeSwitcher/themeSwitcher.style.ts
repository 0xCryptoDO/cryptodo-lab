import { styled } from '@/styles';

export const Light = styled('span', {
  display: 'none',
});

export const System = styled('span', {
  display: 'none',
});

export const Dark = styled('span', {
  display: 'none',
});

export const ThemeSwitcher = styled('button', {
  width: 40,
  height: 40,
  padding: 10,
  marginRight: 24,

  backgroundColor: '$greyQuaternary',
  border: 'none',
  borderRadius: 100,
  cursor: 'pointer',
  transition: '0.3s ease-in-out',

  '@tablet': {
    marginRight: 10,
  },

  '& svg': {
    width: 20,
    height: 20,
  },

  '&[data-theme="light"]': {
    '& > .light': {
      display: 'block',
    },
  },
  '&[data-theme="system"]': {
    '& > .system': {
      display: 'block',
    },
  },
  '&[data-theme="dark"]': {
    '& > .dark': {
      display: 'block',
    },
  },
});
