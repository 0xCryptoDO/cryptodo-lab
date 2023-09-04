import { darkTheme, styled } from '@/styles';

import { Space as SpaceInstance, Button, Badge } from '@/components/styled';

export const Card = styled('div', {
  padding: 24,
  backgroundColor: '$white',
  borderRadius: 2,
  transition: '0.3s ease-in-out',

  [`${darkTheme} &`]: {
    backgroundColor: '$sidebar',
  },

  '&:not(:last-child)': {
    marginBottom: 8,
  },
});

export const CreatedText = styled('span', {
  display: 'flex',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap',
});

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  marginBottom: 16,

  '& > .ant-space': {
    width: '100%',
  },
});

export const Text = styled('span', {
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.3,

  variants: {
    secondary: {
      true: {
        color: '$textOpacity',
      },
    },
    large: {
      true: {
        fontSize: 20,
        fontWeight: 400,
      },
    },
  },
});

export const HeaderStatuses = styled('div', {
  display: 'flex',
  alignItems: 'center',

  [`& > ${Badge}:not(:last-child)`]: {
    marginRight: '.25rem',
  },
});
export const HeaderInfo = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [`& > ${SpaceInstance}`]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px !important',
  },
});

export const CardActions = styled('div', {
  display: 'none',

  '& > .button': {
    '& > button': {
      height: 34,
    },

    '&:first-child': {
      width: '100%',

      '& > button': {
        width: '100%',
      },
    },
  },

  variants: {
    isFooter: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',

        '@fromTablet': {
          display: 'none',
        },
      },
    },
    post: {
      true: {
        [`& ${Button}`]: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '& > svg path': {
            stroke: '$text',
          },

          '&:first-child': {
            marginRight: 1,

            borderRadius: '2px 0 0 2px',
          },
          '&:last-child': {
            borderRadius: '0 2px 2px 0',
          },
        },
      },
    },
  },
});

export const CardFooter = styled(SpaceInstance, {
  width: '100%',
  gap: '24px !important',
  marginBottom: 12,
});
