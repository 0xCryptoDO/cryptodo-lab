import { styled } from '@/styles';

export const Prices = styled('div', {
  padding: 0,
});
export const PricesItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
export const Currencies = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 516,
  gap: 4,

  '@tablet': {
    width: '100%',
  },
});
export const CurrenciesIcon = styled('span', {
  '& > svg': {
    height: 24,
    width: 24
  }
});

export const Currency = styled('button', {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,

  width: 'calc(50% - 2px)',
  padding: '.5rem 1.5rem .5rem .75rem',

  backgroundColor: 'transparent',
  border: '1px solid $border',
  borderRadius: '$default',

  transition: '0.2s ease-in-out',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$greySecondary',
  },

  '& > .ant-space': {
    width: '100%',

    '& > .ant-space-item': {
      '&:first-child': {
        position: 'relative',
        top: 3,
      },

      '&:last-child': {
        margin: '0 auto',
      },
    },
  },

  '@tablet': {
    width: '100%',
    '&:not(:last-child)': {
      marginBottom: '8px !important',
    },
    '&:not(:nth-last-child(1)):not(:nth-last-child(2))': {
      marginBottom: 0,
    },
    '&:not(:nth-child(2n))': {
      marginRight: 0,
    },
  },

  variants: {
    isActive: {
      true: {
        cursor: 'default',
        borderColor: '$primary',

        '&:hover': {
          backgroundColor: 'inherit',
        },
      },
    },
  },
});

export const PayButtonContent = styled('div', {
  display: 'grid',
  gap: 4,
  'grid-template-columns': 'auto auto',
  'align-items': 'center'
})

export const SelectItem = styled('div', {
  display: 'flex',
  'align-items': 'center',
  '& > div > svg': {
    height: 30,
    marginRight: 4
  }
})
