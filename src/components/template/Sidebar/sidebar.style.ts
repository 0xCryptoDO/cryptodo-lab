import { styled } from '@/styles';

import { LinkIcon } from '@/components/styled';

export const ToggleButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: -12,
  bottom: 32,
  zIndex: 5,
  width: 24,
  height: 24,
  padding: 0,
  transform: 'rotate(90deg)',
  backgroundColor: '$white',
  border: '1px solid $sidebar',
  borderRadius: 100,
  cursor: 'pointer',
});

export const Sidebar = styled('aside', {
  position: 'fixed',
  zIndex: 2,
  top: 0,
  bottom: 0,
  left: 0,
  width: 250,
  paddingTop: 72,
  paddingBottom: 16,
  backgroundColor: '$sidebar',

  variants: {
    isTransition: {
      true: {
        transition: '0.3s ease-in-out',

        // FIXME: refer to as media not classnames
        [`& ${ToggleButton}`]: {
          transition: '0.3s ease-in-out',
        },
        '& .sidebar__label': {
          transition: '0.3s ease-in-out',
        },
        '& .sidebar__link': {
          transition: '0.3s ease-in-out',
        },
        [`& ${LinkIcon}`]: {
          transition: '0.3s ease-in-out',
        },
      },
    },
    isClosed: {
      true: {
        width: 90,

        // FIXME: refer to as media not classnames
        '& .sidebar__toggle-button': {
          transform: 'rotate(-90deg)',
        },
        '& .sidebar__label': {
          transform: 'translateX(25px)',
          opacity: 0,
          wordBreak: 'keep-all',
          whiteSpace: 'nowrap',
        },

        '& .sidebar__icon': {
          marginRight: 0,
        },

        '& .sidebar__link': {
          padding: '0 25px',
        },
      },
    },
  },
});
