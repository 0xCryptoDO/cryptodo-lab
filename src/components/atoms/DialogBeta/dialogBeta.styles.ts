import { blackA } from '@radix-ui/colors';
import * as Dialog from '@radix-ui/react-dialog';
import { keyframes } from '@stitches/react';

import { Divider } from '@/components/atoms/Divider/divider.style';
import { styled } from '@/styles';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledContent = styled(Dialog.Content, {
  minWidth: '740px',
  zIndex: '999',
  paddingBottom: '40px',
  marginTop: '10px',
  backgroundColor: '$dialog',
  overflow: 'auto',
  borderRadius: '$default',
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
    minWidth: '370px',
  },

  '@mobile': {
    top: '50%',
    maxHeight: '100%',
    minWidth: '185px',
  },
});
export const Content = StyledContent;

export const Flex = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const CloseTop = styled('div', {
  position: 'absolute',
  top: '.75rem',
  right: '.75rem',
  cursor: 'pointer',

  'svg > g': {
    stroke: '$textDark',
  },
});

export const Overlay = styled(Dialog.Overlay, {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: 'fixed',
  zIndex: 16,
  backgroundColor: blackA.blackA9,
  pointerEvents: 'auto',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});
