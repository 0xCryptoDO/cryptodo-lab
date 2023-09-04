import { Space } from '@/components';
import { styled } from '@/styles';

export const Networks = styled(Space, {
  marginRight: 24,
  overflow: 'auto',

  '& .ant-btn': {
    fontSize: 14,
  },

  '@tablet': {
    order: 2,
    margin: '0 -4%',
    padding: '0 4%',
    width: '100%',
  },
});

export const NetworksCount = styled('span', {
  display: 'block',
  marginLeft: 6,
  opacity: 0.6,
});
