import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 15,
  padding: 24,
  borderRadius: 15,
  border: '1px solid $border',
  width: 450,

  '@fromPhone': {
    width: '100%',
  },
});

export const Box = styled('div', {
  display: 'flex',

  variants: {
    display: {
      inline: {
        alignItems: 'center',

        '@tablet': {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      block: {
        flexDirection: 'column',
        justifyContent: 'center',

        '@tablet': {
          alignItems: 'center',
        },
      },
    },
  },
});

export const Title = styled('div', {
  marginTop: 0,
  marginBottom: 5,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: 1.3,

  '@tablet': {
    fontSize: 10,
    marginTop: 2,
  },
});

export const Text = styled('div', {
  marginTop: 3,
  fontWeight: 400,
  fontSize: 24,
  lineHeight: 0.8,
  opacity: 0.9,

  '@tablet': {
    fontSize: 21,
  },
});

export const Image = styled('div', {
  background: '$green',
  width: 46,
  height: 46,
  borderRadius: 23,
  marginRight: 10,

  '@tablet': {
    marginRight: 0,
    width: 36,
    height: 36,
  },
});
