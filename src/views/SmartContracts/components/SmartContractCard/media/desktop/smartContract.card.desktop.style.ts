import { darkTheme, styled } from '@/styles';

import { Space as SpaceInstance, Button, Badge } from '@/components/styled';

export const Card = styled('div', {
  display: 'block',

  padding: 24,
  backgroundColor: '$white',
  borderRadius: '$default',
  transition: '0.3s ease-in-out',
  minWidth: '49rem',

  [`${darkTheme} &`]: {
    backgroundColor: '$sidebar',
  },

  '&:not(:last-child)': {
    marginBottom: 8,
  },
});

export const CreatedText = styled('span');

export const Header = styled('header', {
  marginBottom: 40,

  '& > .ant-space': {
    width: '100%',
  },
});

export const Text = styled('span', {
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.3,
  transition: 'color 0.3s ease-in-out',

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
});

export const CardActions = styled('div', {
  display: 'flex',
  gap: '5px',

  '& > .button': {
    '& > button': {
      height: 34,
    },

    '&:not(:last-child)': {
      marginRight: '.5rem',
    },
  },

  [`& ${Button}`]: {
    '& svg path': {
      color: '$textDark',
    },
  },
  variants: {
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

            borderRadius: '$default',
          },
          '&:last-child': {
            borderRadius: '$default',
          },
        },
      },
    },
  },
});

export const CardActionsWrapper = styled('div', {
  display: 'flex',

  '& > .button': {
    display: 'flex',

    marginRight: 8,

    '& > button': {
      height: '100%',
      paddingBottom: 0,

      color: '$textDart',
    },
  },
});

export const CardFooter = styled(SpaceInstance, {
  width: '100%',
  gap: 32,
});
