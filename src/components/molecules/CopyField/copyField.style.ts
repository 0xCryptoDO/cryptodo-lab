import { styled } from '@/styles';
import { CopyButton } from '@/components/atoms/CopyButton/copyButton.style';

export const CopyField = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  background: '$greyQuaternary',
  border: '1px solid $border',
  borderRadius: '$default',
  transition: '0.3s ease-in-out',

  [`& > ${CopyButton}`]: {
    width: 42,
    borderLeft: '1px solid $border',
  },
});

export const Text = styled('span', {
  display: 'block',
  flexShrink: 1,
  position: 'relative',
  width: '100%',
  padding: '10px 0 10px 16px',
  overflow: 'hidden',
  color: '$textOpacity',
  fontSize: 16,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'color 0.3s ease-in-out',

  '&::after': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 60,
    background:
      'linear-gradient(270deg, $greyQuaternary 24.14%, rgba(244, 245, 247, 0) 100%)',
    transition: '0.3s ease-in-out',
  },
});
