import { styled } from '@/styles';

export const Badge = styled('span', {
  display: 'block',
  whiteSpace: 'nowrap',
  padding: '2px 6px',
  borderRadius: '$default',
  marginRight: 4,
  fontWeight: 500,
  fontSize: 13,
  lineHeight: 1.5,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  backgroundColor: '$greyQuaternary',
  color: '$textOpacity',

  '@tablet': {
    marginRight: 8,
    fontSize: 11,
  },

  variants: {
    color: {
      blue: {
        backgroundColor: '$primaryOpacity',
        color: '$primary',
      },
      green: {
        backgroundColor: '$greenOpacity',
        color: '$green',
      },
      yellow: {
        backgroundColor: '$yellowOpacity',
        color: '$yellow',
      },
      purple: {
        backgroundColor: '$purpleOpacity',
        color: '$purple',
      },
    },
  },
});
