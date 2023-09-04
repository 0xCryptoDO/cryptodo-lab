import { styled } from '@/styles';
import { Space, Text } from '@/components/styled';

export const Input = styled(Space, {
  width: '100%',
});

export const InputComponent = styled('input', {
  borderRadius: '$default',
  width: '100%',
  height: 46,
  padding: '12px 16px',
  backgroundColor: 'transparent',
  border: '1px solid var(--colors-border) ',
  outline: 'none',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.4,
  transition: '0.3s ease-in-out',


  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
});

export const Addon = styled('div', {
  borderRight: '1px solid $border',
  transition: '0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 1rem',
  cursor: 'pointer',
  border: 'none',
});

export const InputWrapper = styled('div', {
  display: 'flex',
  backgroundColor: '$greyTertiary',
  transition: '0.3s ease-in-out',
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

export const Label = styled(Text, {
  margin: '0 0 8px 0',
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  letterSpacing: '0.04em',
});

export const Error = styled('div', {
  color: '$red',
  fontSize: '.75rem',
  marginTop: '.25rem',
});
