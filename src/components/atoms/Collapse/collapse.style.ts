import { keyframes } from '@stitches/react';
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';

import { styled } from '@/styles';
import { Divider } from '@/components/atoms/Divider/divider.style';

const open = keyframes({
  from: { height: 0, padding: '0 24px 0' },
  to: {
    height: 'var(--radix-accordion-content-height)',
    padding: '0 24px 24px',
  },
});

const close = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0, padding: '0 24px 0' },
});

export const Collapse = styled(Root);

export const CollapseItem = styled(Item, {
  backgroundColor: '$white',
  border: '1px solid $border',
  borderRadius: '$default',

  '&:not(:last-child)': {
    marginBottom: 8,
  },

  [`& ${Divider}`]: {
    margin: '0 -24px 20px',
  },
});

export const StyledHeader = styled(Header, {
  marginBottom: 0,
});

export const StyledTrigger = styled(Trigger, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '20px 24px 20px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: 16,
  textAlign: 'left',
  lineHeight: 1.4,

  '& > svg': {
    transform: 'rotate(0deg)',
    transition: '0.2s ease-in-out',
  },

  '&[data-state="open"] > svg': {
    transform: 'rotate(180deg)',
  },
});

export const StyledContent = styled(Content, {
  padding: '0 24px 24px',
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${open} 300ms cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${close} 300ms cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal forwards`,
  },
});
