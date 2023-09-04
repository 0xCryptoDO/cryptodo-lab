import { styled, keyframes } from '@stitches/react';
import { mauve } from '@radix-ui/colors';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: '14rem',
  backgroundColor: '$dropdown',
  borderRadius: 2,
  padding: '.5rem',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const StyledItem = styled(DropdownMenuPrimitive.Item, {
  all: 'unset',
  fontSize: '.825rem',
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  padding: '.5rem 1rem',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
  transition: '0.2s ease-in-out',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$primary',
    color: 'white',
  },

  '& > svg': {
    marginRight: '.5rem',
  },
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: '$dropdown',
  transition: '0.2s ease-in-out',
});

// Exports
export { Root, Trigger } from '@radix-ui/react-dropdown-menu';
export const Content = StyledContent;
export const Item = StyledItem;
export const Arrow = StyledArrow;
