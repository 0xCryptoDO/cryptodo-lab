import { styled } from '@/styles';
import { Space, Text } from '@/components/styled';

export const TextArea = styled(Space, {
  width: '100%',
});

export const TextAreaComponent = styled('textarea', {
  width: '100%',
  height: 'auto',
  minHeight: 92,
  resize: 'none',
  padding: '12px 16px',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.4,
  transition: '0.3s ease-in-out',
  borderRadius: '$default',

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

export const TextAreaWrapper = styled('div', {
  display: 'flex',
  backgroundColor: '$greyTertiary',
  transition: '0.3s ease-in-out',
  border: '1px solid var(--colors-border)',
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
  margin: '0px 0px 8px',
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
