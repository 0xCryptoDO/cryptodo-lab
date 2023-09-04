import { darkTheme, styled } from '@/styles';

export const NavListItem = styled('div', {
  overflow: 'hidden',
  transition: '0.3s ease-in-out',
});

export const ItemLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  textDecoration: 0,
  position: 'relative',
  height: 65,
  padding: '0 12px',
  backgroundColor: 'transparent',
  overflow: 'hidden',

  '&:hover': {
    // FIXME: refer to as media not classnames
    '& > .sidebar__icon': {
      backgroundColor: '$primarySelected',

      [`.${darkTheme} &`]: {
        backgroundColor: '$darkblue',
      },
    },
  },

  '@tablet': {
    height: 'auto',
    padding: '16px 20px !important',
    borderBottom: '1px solid $border',
    transition: '0.3s ease-in-out',

    '&:hover': {
      // FIXME: refer to as media not classnames
      '& > .sidebar__icon': {
        backgroundColor: '$white',
      },
    },
  },

  variants: {
    isActive: {
      true: {
        '@fromTablet': {
          backgroundColor: '$primarySelected',

          [`.${darkTheme} &`]: {
            backgroundColor: '$sidebar',

            '& #profile-icon path': {
              stroke: '$primary',

              '&[data-filled="true"]': {
                fill: '$primary',
              },
            },

            '& #smartcontract-icon path': {
              fill: '$primary',
            },

            '& svg path': {
              stroke: '$primary',

              '&[data-filled="true"]': {
                fill: '$primary',
              },
            },
          },
        },
      },
    },
  },
});

export const LinkLabel = styled('span', {
  color: '$text',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1.3,
  wordBreak: 'break-word',
  whiteSpace: 'nowrap',

  '@tablet': {
    color: '$textDark',
    fontSize: 20,
    transform: 'none',
    opacity: 1,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
});

export const LinkIcon = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 50,
  height: 50,
  marginRight: 8,
  backgroundColor: 'transparent',
  borderRadius: 100,

  '& > svg': {
    width: 30,
    height: 30,

    '& > path': {
      transition: '0.3s ease-in-out',
    },
  },

  '@tablet': {
    display: 'none',
  },
});
