import { styled } from '@/styles';

import { Collapse, Space, Text } from '@/components/atoms/styled';

export const Wrapper = styled('section', {
  display: 'flex',
  alignItems: 'flex-start',

  '@tablet': {
    display: 'block',
  },
});

export const DividerWrapper = styled('div', {
  '@fromTablet': {
    display: 'none',
  },
});

export const FormWrapper = styled('div', {
  padding: '10px',
});

export const Content = styled('div', {
  width: '62%',
  marginRight: 20,

  '@tablet': {
    width: '100%',
    marginRight: 0,
  },

  '& > .ant-space': {
    width: '100%',
  },
});

export const Title = styled(Text, {
  marginBottom: '24px !important',
  fontSize: '32px !important',
  fontWeight: '500 !important',

  '@tablet': {
    fontSize: '24px !important',
  },
  variants: {
    size: {
      small: {
        fontSize: '24px !important',
      },
    },
    margin: {
      left: {
        marginLeft: '12px !important',
      },
      no: {
        marginBottom: '0 !important',
      },
    },
    color: {
      gray: {
        color: '$textOpacity',
      },
    },
  },
});

export const ContentInputs = styled(Space, {
  minWidth: '100%',
  gap: '4rem !important',

  '@laptop': {
    gap: '1rem !important',
  },

  '@tablet': {
    flexDirection: 'column',

    gap: '24px !important',
  },
});

export const AdvancedTitle = styled(Text, {
  fontSize: '12px',
  letterSpacing: '0.04em',
});

export const Advanced = styled(Collapse, {
  marginTop: '24px',
  backgroundColor: 'transparent',
  border: 'none',
  '@tablet': {
    marginTop: 16,
    marginBottom: 32,
  },
});

export const Options = styled(Space, {
  flexWrap: 'wrap',
  gap: '8px !important',
});

export const TokenTagWrapper = styled('div', {});

export const Star = styled('span', {
  fontSize: '20px',
  color: 'gold',
});
