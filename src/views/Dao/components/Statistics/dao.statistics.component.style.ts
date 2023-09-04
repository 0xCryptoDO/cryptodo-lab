import { styled } from '@/styles';

import { Text } from '@/components/styled';

export const Container = styled('div', {
  variants: {
    display: {
      inline: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,

        '@tablet': {
          width: 450,
        },
      },
    },
  },
});

export const Title = styled('h3', {
  marginTop: 15,
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
  width: 100,
  height: 100,
  borderRadius: 50,

  '@tablet': {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export const Description = styled(Text, {
  opacity: 0.9,

  '@tablet': {
    fontSize: 10,
  },
});
