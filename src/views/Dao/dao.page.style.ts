import { styled } from '@/styles';

export const Container = styled('section');

export const Title = styled('div', {
  marginTop: 0,
  marginBottom: 5,
  fontWeight: 500,
  fontSize: 32,
  lineHeight: 1.3,

  '@tablet': {
    fontSize: 24,
  },
});

export const Text = styled('div', {
  marginTop: 0,
  marginBottom: 16,
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 0.8,
  opacity: 0.9,

  '@tablet': {
    marginBottom: 24,
    fontSize: 24,
  },
});

export const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 1300,
  alignItems: 'center',

  '@fromLaptop': {
    flexDirection: 'column',
    justifyContent: '',
    alignItems: 'flex-start',
  },
});
