import * as CheckboxRadix from '@radix-ui/react-checkbox';

import { styled } from '@/styles';

export const CheckboxRoot = styled(CheckboxRadix.Root, {
  all: 'unset',
  backgroundColor: 'transparent',
  border: '1px solid var(--colors-border)',
  width: '24px',
  height: '24px',
  borderRadius: '$default',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 10px var(--blackA7)',
  '&:hover': {
    cursor: 'pointer',
  },
});

export const Label = styled('label', {
  userSelect: 'none',
});
