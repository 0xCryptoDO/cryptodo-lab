import { Space } from '@/components';
import { styled } from '@/styles';

export const Statuses = styled(Space, {
  marginRight: 24,
  overflow: 'auto',

  '& .ant-btn': {
    fontSize: 14,
  },

  '@tablet': {
    order: 2,
    width: '100% !important',
    margin: '0 -4%',
    padding: '0 4%',

    '& > *': {
      width: '100%',
    },
  },
});
