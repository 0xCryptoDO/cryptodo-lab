import { styled } from '@/styles';

import { Space } from '@/components/styled';

export const BlockchainsWrapper = styled(Space, {
  width: '100%',
  gap: '12px !important',
});

export const BlockchainsList = styled('ul', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '4px',
  margin: 0,
  padding: 0,
  listStyle: 'none',

  '@tablet': {
    gridTemplateColumns: '1fr 1fr',
    gridGap: '12px',
  },
});

export const ItemDescription = styled('button', {
  position: 'absolute',
  top: 8,
  right: 8,
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  '@tablet': {
    width: 16,
    height: 16,

    '& > svg': {
      width: 16,
      height: 16,
    },
  },
});

export const BlockchainsInfo = styled('div', {
  padding: '12px 16px',
  backgroundColor: '$primaryOpacity',
  color: '#89b0ff',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  letterSpacing: '0.02em',
  borderRadius: '$default',
});
