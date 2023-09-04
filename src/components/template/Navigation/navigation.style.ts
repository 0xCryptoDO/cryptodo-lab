import { styled } from '@/styles';

export const Navigation = styled('nav', 'a', {
  textDecoration: 'none',
  height: '100%',
  '@tablet': {
    position: 'fixed',
    top: 100,
    right: 0,
    left: 0,
    bottom: 0,
    height: 'auto',
    visibility: 'hidden',
    backgroundColor: '$white',
    opacity: 0,
    transition: '0.3s ease-in-out',
  },
});

export const NavList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const NavListTop = styled('li', {
  '@tablet': {
    '& > div:first-child > .sidebar__link': {
      borderTop: '1px solid $border',
    },
  },
});
export const NavListBottom = styled('li', {
  '@fromTablet': {
    marginTop: 'auto',
  },
});

export const ConnectWalletButton = styled('li', {
  display: 'none',
  padding: '24px 20px',
  borderTop: '1px solid $border',
  transition: '0.3s ease-in-out',

  '& > .ant-btn': {
    width: '100%',
  },

  '@tablet': {
    display: 'block',

    marginTop: 'auto',
  },
});
