import { Text } from '@/components/styled';
import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  transition: '0.3s ease-in-out',

  variants: {
    display: {
      inline: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,

        '@tablet': {
          width: 450,
        },
      },
      block: {
        flexDirection: 'column',

        '@tablet': {
          marginLeft: 7,
        },
      },
    },
  },
});

export const Title = styled('h3', {
  marginTop: 0,
  marginBottom: 4,
  fontWeight: 500,
  fontSize: 24,
  lineHeight: 1.4,

  '@tablet': {
    fontSize: 15,
  },

  '@fromPhone': {
    marginBottom: 0,
  },
});

export const Description = styled(Text, {
  opacity: 0.9,
  maxWidth: 330,

  '@fromPhone': {
    width: '100%',
    maxWidth: 'none',
    fontSize: '8px',
  },
  '@tablet': {
    fontSize: 10,
  },
});
