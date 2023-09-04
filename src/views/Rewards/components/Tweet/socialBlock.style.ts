import { styled } from '@/styles';

export const SocialBlock = styled('div', {
  display: 'flex',
  gap: 20,

  width: '100%',
  padding: '24px 28px',

  backgroundColor: '$white',
  borderRadius: 2,
});

export const ContainerElement = styled('div');

export const Logo = styled('div', {
  '& > svg': {
    width: 80,
    height: 'auto',
  },
});

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

export const Link = styled('a', {
  maxWidth: 'fit-content',
  textDecoration: 'none',
});

export const Container = styled('div', {
  display: 'flex',
  gap: 12,
})

export const Title = styled('div', {
  marginBottom: 12,
  fontSize: '20px',
});
