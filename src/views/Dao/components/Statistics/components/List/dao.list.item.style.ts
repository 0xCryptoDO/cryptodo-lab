import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
  width: 450,

  '@fromPhone': {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'normal'
  }
});

export const Link = styled('a', {
    textDecoration: 'none'
  });