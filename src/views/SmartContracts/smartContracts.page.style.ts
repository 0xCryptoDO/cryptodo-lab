import { styled } from '@/styles';

import { Button } from '@/components';
import { ButtonSecondaryTheme, Space, Text } from '@/components/styled';

export const Header = styled(Space, {
  justifyContent: 'space-between',
  minWidth: '45rem',
  marginBottom: '2rem',

  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem',
    alignItems: 'start !important',
    gap: '10px !important',
  },
});
export const Title = styled(Text, {
  // FIXME: no !important
  fontSize: '32px !important',
  marginBottom: '0 !important',
  fontWeight: '500 !important',

  '@tablet': {
    fontSize: '24px !important',
  },
});

export const CreateButton = styled(Button, {
  '& .ant-space-item:first-child': {
    height: 18,
  },

  '@tablet': {
    fontSize: 14,
  },
});

export const SecondaryButton = styled(Button, {
  variants: {
    theme: {
      secondary: {
        '& .ant-btn': {
          ...ButtonSecondaryTheme,
          color: '$textDark',
        },
      },
    },
  },
});
