import { styled } from '@/styles';

export const Space = styled('div', {
  display: 'flex',
  gap: 8,

  variants: {
    size: {
      small: {
        gap: 4,
      },
      default: {
        gap: 8,
      },
      middle: {
        gap: 16,
      },
      big: {
        gap: 24,
      },
      large: {
        gap: 32,
      },
    },
    align: {
      center: {
        alignItems: 'center',
      },
      flexEnd: {
        alignItems: 'flex-end',
      },
      flexStart: {
        alignItems: 'flex-start',
      },
    },
    direction: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
  },
});
