import { styled } from '@/styles';

import { Text } from '@/components';

export const Wrapper = styled('div', {
  width: '100%',

  '& .react-datepicker__input-container > input': {
    width: '100%',
    height: 46,
    padding: '12px 16px',
    backgroundColor: '$greyTertiary',
    border: '1px solid var(--colors-border)',
    borderRadius: '$default',
    outline: 'none',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.4,
    transition: '0.3s ease-in-out',

    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
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

export const Error = styled('div', {
  color: '$red',
  fontSize: '.75rem',
  marginTop: '.25rem',
});

export const Label = styled(Text, {
  margin: '0 0 8px 0',
  padding: '0px',
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  letterSpacing: '0.04em',
});
