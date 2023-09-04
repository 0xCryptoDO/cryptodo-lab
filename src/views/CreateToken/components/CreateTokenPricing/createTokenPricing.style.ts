import { Button, Divider } from '@/components';

import { styled } from '@/styles';

export const Pricing = styled('div', {
  width: '38%',

  '& .ant-divider': {
    margin: '20px 0',
  },

  '@tablet': {
    width: '100%',
  },
});

export const Block = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: '$white',
  border: '1px solid $border',
  borderRadius: '$default',
  transition: '0.3s ease-in-out',

  '&:not(:last-child)': {
    marginBottom: 8,
  },
});
export const BlockTitle = styled('div', {
  padding: '0 24px',
});
export const Title = styled('span', {
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '140%',
});
export const BlockButton = styled('div', {
  padding: '0 24px',
});
export const BlockPrices = styled('div', {
  padding: '0 24px',

  [`& > ${Divider}`]: {
    width: 'auto',
    marginRight: '-24px !important',
    marginLeft: '-24px !important',
  },
});
export const PriceItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '&:not(:last-child)': {
    marginBottom: 12,
  },

  variants: {
    isTotal: {
      true: {
        '& > .ant-typography:last-child': {
          fontSize: 20,
        },
      },
    },
  },
});

export const ShowMore = styled(Button, {
  marginTop: 16,

  fontWeight: 500,

  '& svg': {
    transform: 'rotate(-180deg)',
    transition: '0.2s ease-in-out',
  },

  variants: {
    isHidden: {
      true: {
        '& svg': {
          transform: 'rotate(0)',
        },
      },
    },
  },
});

export const PriceCheck = styled('div', {
  position: 'relative',

  overflow: 'hidden',

  '&::after': {
    content: '',

    position: 'absolute',
    right: 0,
    bottom: -34,
    left: 0,

    height: 90,
  },

  variants: {
    isHidden: {
      true: {
        maxHeight: 100,
        '&::after': {
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, $white 41.67%)',
        },
      },
    },
  },
});


export const Link = styled('a', {
  color: '$textOpacity'
});
