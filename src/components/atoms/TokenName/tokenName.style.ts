// FIXME: ssr error (import order?)
import { Text } from '@/components/atoms/Text/style';

import { styled } from '@/styles';

export const TokenName = styled(Text, {
  marginBottom: '0 !important',
  fontWeight: '500 !important',
  fontSize: 24,
  lineHeight: 1.3,

  [`& ${Text}`]: {
    fontSize: 24,
  },

  '@tablet': {
    fontSize: '20px !important',

    [`& ${Text}`]: {
      fontSize: '20px !important',
    },
  },
});
