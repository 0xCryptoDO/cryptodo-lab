import { darkTheme, styled } from '@/styles';

import { Text } from '@/components/styled';

export const Card = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',

  borderRadius: 10,
  marginTop: 10,
  padding: 15,
  backgroundColor: '$primaryOpacity',
  borderColor: 'transparent',
  textShadow: 'none',

  [`.${darkTheme} &`]: {
    backgroundColor: '$darkblue',
  },
});

export const Container = styled('div', {
  marginLeft: 15,
  '@fromLaptop': {
    marginLeft: 0
  },
});

export const Box = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 135
});

export const Block = styled('div', {
  display: 'flex',
  flexDirection: 'column'
});



export const Image = styled('div', {
  background: '$green',
  width: 32,
  height: 32,
  borderRadius: 16,
});

export const Additional = styled(Text, {
  opacity: 0.8,
  textTransform: 'uppercase',
  textAlign: 'center',

  '@tablet': {
    fontSize: 10,
  },

  variants: {
    variant: {
      primary: {
        opacity: 1
      }
    }
  }
});
