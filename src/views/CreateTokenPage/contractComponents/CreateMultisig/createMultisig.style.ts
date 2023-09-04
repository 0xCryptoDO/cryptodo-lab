import { Space } from '@/components/atoms/Space/space.style';
import { Text } from '@/components/atoms/Text/style';
import { styled } from '@/styles';

export const Wrapper = styled('section', {
  display: 'flex',
  alignItems: 'flex-start',

  '@tablet': {
    display: 'block',
  },
});

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

export const AdvancedTitle = styled(Text, {
  fontSize: '36px',
});

export const DaoFields = styled('div', {
  marginTop: '24px',
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
  width: '100%',
  marginTop: '18px',
  marginBottom: '18px',

  '@tablet': {
    flexDirection: 'column',

    gap: '24px !important',
  },
});

export const ContentOwners = styled('div', {
  display: 'flex',
  variants: {
    position: {
      end: {
        alignItems: 'flex-end',
      },
      center: {
        alignItems: 'center',
      },
    },
  },
});

export const Error = styled('div', {
  color: '$red',
  fontSize: '.75rem',
  marginTop: '.25rem',
});

export const QuorumValue = styled('div', {
  backgroundColor: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',

  width: '124px',
  height: '40px',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
});

export const InputRange = styled('input', {
  backgroundColor: '$white',
  type: 'text',
  pattern: '[0-9]*',
  inputMode: 'numeric',
  paddingLeft: '20px',
  border: 'none',
  width: '66px',
  outline: 'none',
  min: '0',
  max: '100',
});

export const ButtonContainer = styled('div', {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ButtonForSlider = styled('div', {
  width: '24px',
  display: 'flex',
  justifyContent: 'center',

  '&:hover': {
    cursor: 'pointer',
  },

  variants: {
    border: {
      border: {
        borderBottom: '1px solid #e2e8f0',
        '&:hover': {
          cursor: 'pointer',
          borderRadius: '0 10px 0 0',
        },
      },
    },
  },
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

export const PercentValue = styled('div', {
  display: 'flex',
  width: '70px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '3px',
  marginLeft: '10px',
  height: '46px',
  padding: '0 20px',
  backgroundColor: '$greyTertiary',
});
