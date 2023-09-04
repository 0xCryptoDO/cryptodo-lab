import { styled } from '@/styles';
import { Text } from '@/components/atoms/Text/style';
import { Space } from '@/components/atoms/Space/space.style';
import { Collapse } from '@/components/atoms/Collapse/collapse.style';
import { Button } from '@/components';

export const Content = styled('section', {
  width: '62%',
  marginRight: 20,
  marginBottom: 40,

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

export const DaoFields = styled('div', {
  marginTop: '24px',
});

export const ContentInputs = styled(Space, {
  width: '100%',
  display: 'flex',
  marginBottom: '16px',
  '@tablet': {
    flexDirection: 'column',
    gap: '24px !important',
  },
});

export const MinMaxStake = styled(Space, {
  display: 'flex',
});

export const ClaimRewardOptions = styled(Space, {
  display: 'flex',
  marginTop: 10,
});

export const AdvancedTitle = styled(Text, {
  fontSize: '12px',
  letterSpacing: '0.04em',
});

export const Options = styled(Space, {
  flexWrap: 'wrap',
  gap: '8px !important',
});

export const Advanced = styled(Collapse, {
  backgroundColor: 'transparent',
  border: 'none',
  '@tablet': {
    marginBottom: 32,
  },
});

export const DeleteButton = styled(Button, {
  padding: '1rem 1.1rem !important',
  alignItems: 'center',
});

export const Failed = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > svg > path': {
    fill: '$white',
    width: '20px !important',
    height: '20px !important',
  },
});

export const DeleteButtonReplacement = styled('div', {
  width: '120px',
  height: '46px',
});

export const DividerWrapper = styled('div', {
  '@fromTablet': {
    display: 'none',
  },
});
