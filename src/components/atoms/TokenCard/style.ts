import { styled } from '@/styles';

export const TokenCard = styled('li', {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: 'auto'
});

export const BlockchainName = styled('span', {
  fontWeight: 500,
  transition: '0.2s ease-in-out',

  '@tablet': {
    fontSize: 12,
  },
});

export const ItemButton = styled('button', {
  display: 'flex',

  width: '100%',
  padding: '6px 24px',
  backgroundColor: 'transparent',
  border: '1px solid $border',
  borderRadius: '$default',
  cursor: 'pointer',
  transition: '0.2s ease-in-out',

  '& > div': {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'default',
  },

  '&:hover:not(:disabled)': {
    backgroundColor: '$greySecondary',
  },

  '@tablet': {
    padding: '18px 12px',

    '& > .ant-space': {
      gap: '8px !important',
    },
  },

  variants: {
    horizontal: {
      true: {
        justifyContent: 'center',
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          '@tablet': {
            '& > span:last-child': {
              marginTop: 20
            }
          }

        },
      }
    },
    isActive: {
      true: {
        borderColor: '$primary',
        cursor: 'default',

        [ `& ${ BlockchainName }` ]: {
          color: '$primary',
        },
      },
    },
  },
});

export const BlockchainIcon = styled('span', {
  display: 'block',

  '@tablet': {
    height: 28,

    '& > svg': {
      width: 28,
      height: 28,
    },
  },
});

export const PopoverButton = styled('button', {
  position: 'absolute',
  top: 8,
  right: 8,

  height: 16,
  padding: 0,

  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});
