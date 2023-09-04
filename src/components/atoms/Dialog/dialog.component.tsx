import { useEffect } from 'react';

import { Divider } from '@/components';
import { CloseIcon } from '@/assets/icons';

import { DialogProps } from './dialog.types';

import {
  Action,
  Cancel,
  Close,
  Content,
  Flex,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from './dialog.style';

export const Dialog = (props: DialogProps) => {
  const {
    open,
    onOpenChange,
    title,
    cancel,
    action,
    trigger,
    children,
    closeIcon,
    css,
    className,
    onClose,
  } = props;

  const close = () => {
    if (onClose) {
      onClose();
      return;
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');

    if (open) {
      body?.classList.add('overflow-hidden');
      return;
    }

    body?.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Trigger asChild>{trigger}</Trigger>}
      <Portal>
        <Overlay onClick={close} />
        <Content css={css} className={className}>
          {title && (
            <>
              <Title>{title}</Title>
              <Divider />
            </>
          )}
          {children}
          {closeIcon && (
            <Close
              onClick={() => {
                close();
              }}
            >
              <CloseIcon />
            </Close>
          )}
          {(cancel || action) && (
            <Flex>
              {cancel && <Cancel asChild>{cancel}</Cancel>}
              {action && <Action asChild>{action}</Action>}
            </Flex>
          )}
        </Content>
      </Portal>
    </Root>
  );
};
