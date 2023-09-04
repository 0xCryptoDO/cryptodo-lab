import { styled } from '@/styles';

import { Badge, Text } from '@/components/styled';

export const Wrapper = styled('section', {});

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const HeaderWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const BackButton = styled('button', {
  padding: 0,

  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  '& > svg': {
    width: 25,
    height: 25,
  },
});

export const Meta = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '.75rem 0 1.5rem',

  [`& > ${Badge}:not(:last-child)`]: {
    marginRight: '.25rem',
  },
  '& > div:last-child': {
    marginLeft: '1rem',
  },
});

export const Config = styled('div', {
  [`& > ${Text}`]: {
    marginBottom: 12,
  },
});

export const Title = styled('h5', {});

export const Tags = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});
export const TagIcon = styled('div', {
  marginLeft: '.375rem',
  display: 'flex',
  alignItems: 'center',
  '& > svg': {
    '& > path': {
      '&:first-child': {
        fill: '$primary',
        fillOpacity: 1,
      },
      '&:not(:first-child)': {
        stroke: 'white',
      },
    },
  },
  cursor: 'pointer',
});
export const TagMeta = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,

  'span:first-child': {
    opacity: 0.8,
  },

  [`& ${Text}`]: {
    color: 'black',
  },
});
export const Tag = styled('button', {
  background: '$white',
  padding: '.5rem .75rem',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '4px',
  border: '0.5px solid $border',
  '&:not(:last-child)': {
    marginRight: '.25rem',
  },
});
