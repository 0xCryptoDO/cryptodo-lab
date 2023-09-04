import { styled } from '@/styles';

import { Text } from '@/components/styled';

export const Card = styled('div', {
  padding: '24px 24px 28px',
  backgroundColor: '$white',
  borderRadius: 8,
  transition: '0.3s ease-in-out',

  variants: {
    size: {
      small: {
        padding: '16px',
      },
      default: {},
    },
  },
});

export const Title = styled('h3', {
  marginTop: 0,
  marginBottom: 8,
  fontWeight: 500,
  fontSize: 24,
  lineHeight: 1.4,

  '@tablet': {
    fontSize: 20,
  },

  variants: {
    size: {
      small: {
        fontSize: 18,
        marginBottom: 4,

        '@tablet': {
          fontSize: 14,
        },
      },
      default: {},
    },
  },
});

export const Description = styled(Text, {
  marginBottom: 32,

  '@tablet': {
    marginBottom: 16,
  },

  variants: {
    size: {
      small: {
        marginBottom: 16,

        '@tablet': {
          marginBottom: 8,
        },
      },
      default: {},
    },
  },
});

export const Footer = styled('div', {
  display: 'flex',
  marginTop: 32,

  '@tablet': {
    flexDirection: 'column',
    marginTop: 16,
  },

  variants: {
    size: {
      small: {
        marginTop: 16,

        '@tablet': {
          marginTop: 8,
        },
      },
      default: {},
    },
  },
});

export const FooterItem = styled('div', {
  '&:not(:last-child)': {
    marginRight: 40,

    '@tablet': {
      marginRight: 0,
    },
  },

  variants: {
    size: {
      small: {
        '&:not(:last-child)': {
          marginRight: 20,

          '@tablet': {
            marginRight: 0,
          },
        },
      },
      default: {},
    },
  },
});

export const FooterItemTitle = styled(Text, {
  marginBottom: 8,
  color: '$textOpacity',
  fontSize: 12,
  letterSpacing: '0.04em',
});

export const FooterCards = styled('div', {
  display: 'flex',
  '@tablet': {
    flexWrap: 'wrap',
  },
});

export const FooterItemCard = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  minHeight: 40,
  marginBottom: 4,
  backgroundColor: '$greyQuaternary',
  transition: '0.3s ease-in-out',
  borderRadius: 8,

  '&:not(:last-child)': {
    marginRight: 4,

    '@tablet': {
      marginRight: 0,
    },
  },

  '@tablet': {
    width: '100%',

    [`& > ${Text}`]: {
      margin: '0 auto 0 40%',
    },
  },
});

export const FooterItemIcon = styled('span', {
  display: 'block',
  flexShrink: 0,
  width: 24,
  height: 24,
  marginRight: 8,

  '& > svg': {
    width: 24,
    height: 24,
  },
});
