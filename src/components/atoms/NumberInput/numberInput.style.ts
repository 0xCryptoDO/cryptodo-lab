import { styled } from '@/styles';
import { Text } from '@/components/atoms/Text/style';

export const NumberInput = styled('div', {
  width: '100%',
});

export const Input = styled('input', {
  width: '100%',
  height: 46,
  padding: '12px 16px',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  '-moz-appearance': 'textfield',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.4,
  transition: '0.3s ease-in-out',

  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
});

export const PopoverButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  height: 16,
  marginLeft: 4,
  marginBottom: 16,
  padding: 0,
});

export const InputWrapper = styled('div', {
  display: 'flex',
  backgroundColor: '$greyTertiary',
  transition: '0.3s ease-in-out',
  border: '1px solid var(--colors-border) ',
  borderRadius: '$default',
});

export const Control = styled('button', {
  borderRadius: '$default',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  width: 46,
  height: 46,
  backgroundColor: '$white',
  border: 'none',
  transition: '0.3s ease-in-out',

  '&:not(:disabled)': {
    cursor: 'pointer',
  },
  '&:disabled': {
    opacity: 0.4,
  },
});

export const Label = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  letterSpacing: '0.04em',
  margin: '0 0 8px 0px',
});

export const Error = styled('div', {
  color: '$red',
  fontSize: '.75rem',
  marginTop: '.25rem',
});
