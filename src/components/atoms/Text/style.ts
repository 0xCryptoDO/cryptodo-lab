import { styled } from '@/styles';

export const PopoverButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  height: 16,
  marginLeft: 4,
  marginBottom: 16,
  padding: 0,
});

export const Text = styled('span', {
  display: 'inline-block',
  color: '$textDark',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.3,
  transition: 'color 0.3s ease-in-out',

  variants: {
    type: {
      secondary: {
        color: '$textOpacity',
      },
      danger: {
        color: '$red',
      },
    },
    weight: {
      normal: {
        fontWeight: 400,
      },
      middle: {
        fontWeight: 600,
      }
    },
    size: {
      small: {
        fontWeight: 400,
        fontSize: 12,
      },
      default: {
        fontSize: 14,
      },
      middle: {
        fontSize: 16,
      },
      big: {
        fontSize: 18,
      }
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
  },
});
