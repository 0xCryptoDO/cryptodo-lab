import { styled } from '@/styles';

export const Filters = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 20,
  whiteSpace: 'nowrap',

  '& > :last-child': {
    minWidth: '19rem',
  },

  '@tablet': {
    justifyContent: 'unset',
    flexDirection: 'column',
    gap: 5,
  },

  '@fromTablet': {
    gap: 5,
  },
});

export const FiltersWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 5,

  '@tablet': {
    justifyContent: 'unset',
    flexDirection: 'column',

    '& > div': {
      width: '100%',
    },
  },
});
