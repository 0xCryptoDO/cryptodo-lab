import { styled } from '@/styles';

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',

  '& > svg': {
    marginRight: '.5rem',

    width: '20px !important',
    height: 20,
  },
});
