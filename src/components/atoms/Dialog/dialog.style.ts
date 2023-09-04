import { keyframes } from '@stitches/react';
import { blackA, mauve } from '@radix-ui/colors';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { styled } from '@/styles';
import { Divider } from '@/components/atoms/Divider/divider.style';

export {
  Root,
  Trigger,
  Portal,
  Action,
  Cancel,
} from '@radix-ui/react-alert-dialog';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled('div', {
  zIndex: 15,
  backgroundColor: blackA.blackA9,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: 'fixed',
  pointerEvents: 'auto',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  minWidth: 300,
  zIndex: 16,
  backgroundColor: '$dialog',
  overflow: 'auto',
  borderRadius: 2,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '564px',
  maxHeight: '90vh',
  padding: '1.5rem',
  fontSize: '.875rem',
  lineHeight: '1.375rem',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },

  [`& ${Divider}`]: {
    width: 'calc(100% + 48px)',
    marginLeft: '-1.5rem',
    marginRight: '-1.5rem',
  },

  '@tablet': {
    width: '100%',
    maxHeight: '90vh',
    transform: 'translateY(10%)',
    maxWidth: '430px',
  },

  '@mobile': {
    top: '50%',
    maxHeight: '100%',
  },
});

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 12,
  color: '$textDark',
  fontSize: 24,
  fontWeight: 500,

  '@tablet': {
    fontSize: 20,
  },
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: '1.25rem',
  color: mauve.mauve11,
  fontSize: '1rem',
  lineHeight: 1.5,
});

export const Overlay = StyledOverlay;
export const Content = StyledContent;
export const Title = StyledTitle;
export const Description = StyledDescription;

export const Flex = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const Close = styled('div', {
  position: 'absolute',
  top: '.75rem',
  right: '.75rem',
  cursor: 'pointer',

  'svg > g': {
    stroke: '$textDark',
  },
});
