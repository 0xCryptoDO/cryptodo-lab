import { darkTheme, styled } from '@/styles';

export const Status = styled('div', {
  color: '$textDark',
  opacity: 0.4,
  letterSpacing: '0.04em',
  fontSize: '.75rem',
  marginBottom: '.75rem',
});

export const Steps = styled('div', {});
export const Step = styled('div', {
  display: 'flex',
  alignItems: 'center',

  '&:not(:last-child)': {
    marginBottom: '1rem',
  },
});
export const Loader = styled('div', {
  marginRight: '1rem',
  position: 'relative',
  fontSize: '.75rem',
  minWidth: 40,
  minHeight: 40,

  '& > div': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '$stepBg',
    color: '$stepColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,

    [`.${darkTheme} &`]: {
      backgroundColor: '$darkblue',
      color: '$textOpacity',
    },
  },

  variants: {
    loading: {
      true: {
        '& > div': {
          backgroundColor: '$primaryOpacity',
          color: '$primary',

          [`.${darkTheme} &`]: {
            backgroundColor: 'transparent',
            color: '$primary',
          },
        },
      },
    },
  },
});
export const Completed = styled('div', {
  minWidth: 40,
  minHeight: 40,
  backgroundColor: '$greenOpacity',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '1rem',

  '& > svg > path': {
    fill: '$green',
  },
});

export const Failed = styled('div', {
  minWidth: 40,
  minHeight: 40,
  borderRadius: '50%',
  backgroundColor: '$redOpacity',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '1rem',
  '& > svg > path': {
    fill: '$red',
  },
})

export const Meta = styled('div', {
  color: '$textDark',
});
export const MetaTitle = styled('h5', {
  marginBottom: -2,
  fontWeight: 500,
});
export const MetaMessage = styled('p', {
  letterSpacing: '0.04em',
  opacity: 0.4,
  fontSize: '.75rem',
});

export const ImgWrapper = styled('div', {
  width: '40px',
  borderRadius: '100px',
  padding: '10px',
  height: '40px', 
  marginLeft: '8px',
  color: 'white', 
  cursor: 'pointer',
  backgroundColor: '$buttonPrimary',
  transitionDuration: '1s',
  transitionProperty: 'transform',
  '&:hover': {
    transform: 'rotate(360deg)',
  },
})


export const AiStatus = styled('div', {
  position: 'absolute',
  bottom: 10,
  right: 10,
  width: 20,
  height: 20,
})
