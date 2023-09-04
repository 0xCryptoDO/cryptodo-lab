import { styled } from '@/styles';

export const DialogContent = styled('div');
export const DialogContentTitle = styled('h5', {
  fontWeight: 500,
  letterSpacing: '0.04em',
  marginBottom: '.75rem',

  '& > span': {
    color: '$red',
  },
});
export const WalletList = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  '@tablet': {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
});
export const Wallet = styled('div', {
  outline: '0.5px solid $border',
  borderRadius: '$default',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '16px',
  position: 'relative',
  fontSize: '.875rem',
  whiteSpace: 'nowrap',
  maxWidth: '250px',
  minWidth: '250px',

  '&:not(:last-child)': {
    marginRight: '1rem',
    '@tablet': {
      marginRight: '0',
      '&:not(:last-child)': {
        marginBottom: '1rem',
      },
    },
  },

  '& > svg': {
    marginBottom: '.75rem',
  },

  variants: {
    isActive: {
      true: {
        outline: '1px solid $primary',
        color: '$primary',
      },
    },
    disabled: {
      true: {
        opacity: 0.625,
        cursor: 'not-allowed',
      },
    }
  },
});
export const WalletInfo = styled('div', {
  position: 'absolute',
  right: '.625rem',
  top: '.625rem',
  marginBottom: 0,
  cursor: 'pointer',
});
