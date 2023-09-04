import { styled } from '@/styles';

import { Space } from '@/components';
import { Text } from '@/components/styled';

export const NoContract = styled('div', {
  maxWidth: 340,
  margin: '32px auto 0',

  '& > .ant-space': {
    width: '100%',
  },
});

export const ButtonSpace = styled(Space, {});

export const Title = styled(Text, {
  marginBottom: 12,
  fontSize: 24,
});
