import { Space, Text } from '@/components/styled';

import { styled } from '@/styles';

export const Wrapper = styled('div', {
  width: '100%',
  variants: {
    asChild: {
      undefined: {
        padding: 24,
        backgroundColor: '$white',
        borderRadius: 2,

        '&:not(:last-child)': {
          marginBottom: 8,
        },
      },
      true: {},
    },
  },
});

export const InfoItem = styled(Space, {
  [`& > ${Text}:last-child`]: {
    fontSize: '20px !important',
  },

  '@tablet': {
    flexDirection: 'row !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important',
    width: '100%',

    [`& > ${Text}:last-child`]: {
      fontSize: '16px !important',
    },
  },
});

export const Info = styled(Space, {
  alignItems: 'start !important',
  justifyContent: 'space-between',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: '1fr',
  gridColumnGap: '22px',
  gridRowGap: '0px',  

  '@tablet': {
    display: 'block !important',

    [`& > ${InfoItem}:not(:last-child)`]: {
      marginBottom: 16,
    },
  },
  '@laptop': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridRowGap: '22px',
  },
});
