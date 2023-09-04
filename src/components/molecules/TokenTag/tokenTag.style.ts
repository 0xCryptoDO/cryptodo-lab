import { darkTheme, styled } from '@/styles';

import { Text } from '@/components/atoms/styled';

export const PlusIconWrapper = styled('span', {
  height: 18,
  marginRight: 4,

  svg: {
    transition: '0.2s ease-in-out',

    '& > path': {
      stroke: '$textDark',
      transition: '0.2s ease-in-out',
    },
  },
});

export const OptionDescription = styled('div', {
  marginLeft: 4,
  height: 20,
  padding: 0,

  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  '& > svg > path': {
    transition: ' 0.2s ease-in-out',
  },
});

export const Container = styled('button', {
  padding: '4px 12px 4px 8px',
  backgroundColor: '#EEEEF0',
  border: '1px solid $border',
  borderRadius: '$default',

  transition: '0.2s ease-in-out',

  [`.${darkTheme} &`]: {
    backgroundColor: 'transparent',
  },

  '&:hover:not(:disabled)': {
    backgroundColor: '$white',

    [`& ${PlusIconWrapper} > svg > path`]: {
      stroke: '$textDark',
    },
  },

  '&:not(:disabled)': {
    cursor: 'pointer',
  },

  variants: {
    isActive: {
      true: {
        backgroundColor: '$primary !important',

        [`& ${Text}`]: {
          color: '$text',
        },

        [`& ${PlusIconWrapper} > svg`]: {
          transform: 'rotate(45deg)',
          '& > path': {
            stroke: '$textDark',
          },
        },

        [`& ${OptionDescription} > svg > path:first-child`]: {
          fill: '$white',
          fillOpacity: 1,
        },
        '&:hover:not(:disabled)': {
          backgroundColor: '$primary',

          [`& ${PlusIconWrapper} > svg > path`]: {
            stroke: '$textDark',
          },
        },
      },
    },
  },
});
