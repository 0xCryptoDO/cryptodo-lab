import {
  Content,
  Item,
  ItemText,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-select';

import { styled } from '@/styles';

export const Select = styled(Root);

export const StyledTrigger = styled(Trigger, {
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  padding: '12px 16px',
  backgroundColor: 'transparent',
  border: '1px solid $border',
  outline: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  transition: '0.3s ease-in-out',
  borderRadius: '$default',

  '& > svg': {
    position: 'relative',
    top: 1,
    marginLeft: 4,
    transition: '0.2s ease-in-out',
  },

  '&[aria-expanded="true"]': {
    '& > svg': {
      transform: 'rotate(180deg)',
    },
  },

  variants: {
    noBorder: {
      true: {
        padding: '4px 8px',
        border: 'none',
      },
    },
  },
});

export const StyledContent = styled(Content, {
  backgroundColor: '$white',
  borderRadius: '$default',
});

export const StyledViewport = styled(Viewport, {
  borderRadius: '$default',
  boxShadow:
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
});

export const StyledItem = styled(Item, {
  padding: '4px 8px',
  cursor: 'pointer',
  transition: '0.2s ease-in-out',

  '&:first-child': {
    borderRadius: '2px 2px 0 0',
  },

  '&:last-child': {
    borderRadius: '0 0 2px 2px',
  },

  '&[data-state="active"]': {
    backgroundColor: '$primary',
    color: '$white',
  },

  '&:not([data-state="active"]):focus': {
    backgroundColor: '$greyTertiary',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.625,
        cursor: 'not-allowed',
        '&:hover:not(:disabled)': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export const StyledItemText = styled(ItemText, {
  fontWeight: 500,
});
