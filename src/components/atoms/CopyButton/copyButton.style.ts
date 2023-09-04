import { styled } from '@/styles';

export const CopyButton = styled('div', {
  display: 'flex',
});

export const Container = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  flexShrink: 0,
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  '& > svg > path': {
    transition: '0.2s ease-in-out',
  },

  '&:hover > svg > path': {
    stroke: '$primary',
    strokeOpacity: 1,
  },
});
