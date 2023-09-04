import { styled } from '@/styles';

export const Container = styled('section');

export const Title = styled('h1', {
  marginTop: 0,
  marginBottom: 32,
  fontWeight: 500,
  fontSize: 32,
  lineHeight: 1.3,

  '@tablet': {
    marginBottom: 24,
    fontSize: 24,
  },
});
