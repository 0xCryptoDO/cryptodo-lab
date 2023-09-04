import { darkTheme, styled } from '@/styles';

import { Text } from '@/components/styled';

export const Container = styled('div', {
  maxWidth: 450,
  width: '100%',
});

export const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 15px',
  alignItems: 'center',

  variants: {
    theme: {
      filled: {
        borderRadius: 10,
        marginTop: 10,
        padding: 15,
        backgroundColor: '$primaryOpacity',
        borderColor: 'transparent',
        textShadow: 'none',

        [`.${darkTheme} &`]: {
          backgroundColor: '$darkblue',
        },
      },
    },
  },
});

export const Box = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '30%',

  '@phone': {
    width: 126,
  },
});

export const Title = styled('h3', {
  marginTop: 10,
  marginBottom: 4,
  fontWeight: 500,
  fontSize: 24,
  lineHeight: 1.4,

  '@tablet': {
    fontSize: 15,
  },
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

  '@tablet': {
    fontSize: 10,
  },
});
