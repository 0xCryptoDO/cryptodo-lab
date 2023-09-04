import { Space } from '@/components/atoms/Space/space.style';
import { Text } from '@/components/atoms/Text/style';
import { styled } from '@/styles';
import { Button } from '@/components';
import { Collapse } from '@/components/atoms/Collapse/collapse.style';

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
  display: 'flex',
  marginBottom: '16px',
  '@tablet': {
    flexDirection: 'column',
    gap: '24px !important',
  },
});

export const ContentPartners = styled('div', {
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

export const TypeIcon = styled('img', {
  maxWidth: 80,
  maxHeight: 50,
});

export const Container = styled('div', {
  display: 'flex',
});

export const NumberInputWrapper = styled('div', {
  maxWidth: '350px',
});

export const TableWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '20px',
  marginBottom: '20px',
});

export const Table = styled('table', {
  marginTop: '20px',
  marginBottom: '20px',
});

export const TableHead = styled('thead', {});

export const TRow = styled('tr', {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '12px',
  gap: '12px',
  '@tablet': {
    flexWrap: 'wrap',
  },
});

export const THead = styled('th', {
  padding: '12px 16px',
});

export const Tablebody = styled('tbody', {});

export const TCell = styled('td', {
  width: '100%',
});

export const InputWrapper = styled('div', {
  flex: '1 0 14rem',
  '@tablet': {
    flex: '1 1 100%',
  },
});

export const NumberInputContainer = styled('div', {
  flex: '0 0 5rem',
  '@tablet': {
    flex: '1 1 80%',
  },
});

export const ButtonWrapper = styled('div', {
  flex: '0 0 3.2rem',
  display: 'flex',
  alignItems: 'flex-start',

  '@tablet': {
    flex: '1 0 20%',
  },
});

export const DeleteButton = styled(Button, {
  padding: '1rem 1.1rem !important',
  margin: '0 -0.8rem 0 -0.5rem !important',
  alignItems: 'center',

  '@tablet': {
    flexGrow: 1,
    margin: 'unset !important',
  },
});

export const DividerWrapper = styled('div', {
  '@fromTablet': {
    display: 'none',
  },
});

export const Options = styled(Space, {
  flexWrap: 'wrap',
  gap: '8px !important',
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
