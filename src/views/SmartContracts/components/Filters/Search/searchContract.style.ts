import { Space } from '@/components';
import { styled } from '@/styles';

export const Search = styled(Space, {
  display: 'flex',
  
  '& .ant-select-selector': {
    alignItems: 'center',
    height: 'auto !important',
    backgroundColor: 'transparent !important',
  },
  '& .ant-input-group-addon': {
    backgroundColor: '$greyTertiary',
  },

  '@tablet': {
    marginBottom: 12,
  },
});
