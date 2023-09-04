import * as Dialog from '@radix-ui/react-dialog';
import { useEffect } from 'react';

import { Divider } from '@/components';
import { CloseIcon } from '@/assets/icons';

import { Flex, Content, CloseTop, Overlay } from './dialogBeta.styles';

import { DialogBetaProps } from './dialogBeta.types';

export const DialogBeta = (props: DialogBetaProps) => {
  const {
    open,
    onOpenChange,
    title,
    cancel,
    action,
    trigger,
    children,
    closeIcon,
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Overlay />
        <Content className={className}>
          {title && (
            <>
              <Dialog.Title>{title}</Dialog.Title>
              <Divider />
            </>
          )}
          {children}
          {closeIcon && (
            <CloseTop
              onClick={() => {
                close();
              }}
            >
              <CloseIcon />
            </CloseTop>
          )}
          {(cancel || action) && (
            <Flex>
              {cancel && <Dialog.Close asChild>{cancel}</Dialog.Close>}
              {action && <Dialog.Close asChild>{action}</Dialog.Close>}
            </Flex>
          )}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
