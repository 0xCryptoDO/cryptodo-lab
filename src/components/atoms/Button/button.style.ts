import { darkTheme, styled } from '@/styles';

export const ButtonSecondaryTheme = {
  whiteSpace: 'normal',
  backgroundColor: '$primaryOpacity',
  borderColor: 'transparent',
  color: '$primary',
  textShadow: 'none',

  [`.${darkTheme} &`]: {
    backgroundColor: '$darkblue',
  },
};

export const ButtonLinkTheme = {
  padding: '0 6px',
  backgroundColor: 'transparent',
  color: '$primary',
  fontSize: 12,
};

export const Button = styled('button', {
  display: 'flex',
  whiteSpace: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$buttonPrimary',
  border: 'none',
  borderRadius: '$default',
  cursor: 'pointer',
  color: '$text',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.3,
  transition: '0.3s ease-in-out',

  variants: {
    theme: {
      primary: {},
      danger: {
        backgroundColor: '$red',
      },
      secondary: {
        ...ButtonSecondaryTheme,
      },
      secondaryDark: {
        ...ButtonSecondaryTheme,
        color: '$textDark',

        [`.${darkTheme} &`]: {
          color: 'rgba(255, 255, 255, 0.75)',
        },
      },
      link: {
        ...ButtonLinkTheme,
      },
    },
    stretch: {
      true: {
        width: '100%',
        whiteSpace: 'normal',
      },
    },
    size: {
      small: {
        padding: '12px 16px',
      },
      large: {
        padding: '12px 24px',
      },
    },
    disabled: {
      true: {
        opacity: 0.625,
        cursor: 'not-allowed',
      },
    },
    active: {
      true: {
        opacity: 0.625,
      },
    },
    margin: {
      true: {
        margin: '0 4px',
      },
    },
  },
});
