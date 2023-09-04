import { Dialog as DialogPrimitive } from '@/components';

import { styled } from '@/styles';

export const Dialog = styled(DialogPrimitive, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '$default',
});

export const Success = styled('div', {
  marginTop: '2rem',
  width: 64,
  height: 64,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$greenOpacity',

  '& > svg > path': {
    fill: '$green',
  },
});

export const Title = styled('h3', {
  fontSize: '1.5rem',
  lineHeight: '2rem',
  textAlign: 'center',
  fontWeight: 500,
  margin: '1.5rem 0 2rem',
});
