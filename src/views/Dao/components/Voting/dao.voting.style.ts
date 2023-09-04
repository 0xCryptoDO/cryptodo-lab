import { styled } from '@/styles';

export const Container = styled('div', {
  width: '100%',
  maxWidth: 450,
});

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: 4,
});

export const Title = styled('h3', {
  marginTop: 10,
  fontWeight: 500,
  fontSize: 24,
  lineHeight: 1.4,

  '@tablet': {
    fontSize: 15,
  },
});
