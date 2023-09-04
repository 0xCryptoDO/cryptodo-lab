import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useMedia } from 'react-use';

import { useEthers } from '@cryptodo/frontend-sdk';

import { Dialog, Button } from '@/components';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleSignMessageDialog, toggleLoading } from '@/reduxStore/slices/ui/ui.slice';
import { removeToken } from '@/reduxStore/slices/auth/authSlice';

import { SignMessageDialogProps } from './signMessage.types';

export const SignMessageDialog: FC<SignMessageDialogProps> = (props) => {
  const { setMessageToSign } = props;

  const signMessageDialogOpen = useTypedSelector(
    (state) => state.ui.signMessageDialogOpen
  );
  const token = useTypedSelector((state) => state.auth.token);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');
  const isMobile = useMedia('(max-width: 769px)', false);
  const { deactivate } = useEthers();

  return (
    <Dialog
      open={signMessageDialogOpen}
      onOpenChange={(open) => {
        deactivate();
        dispatch(removeToken());
        dispatch(toggleLoading({is:false}))
        dispatch(toggleSignMessageDialog(open));
      }}
      title={t('signMessageDialog.title')}
      css={{
        width: isMobile ? 'calc(100% - 40px)' : 'auto',
        borderRadius: '8px',
      }}
      // closeIcon
      action={
        <Button
          stretch
          onClick={(e) => {
            e.preventDefault();
            setMessageToSign();
          }}
          css={{ marginTop: '1rem' }}
        >
          {t('signMessageDialog.button')}
        </Button>
      }
    >
      <div style={{ textAlign: 'center' }}>
        {token
          ? t('signMessageDialog.message')
          : t('signMessageDialog.authMessage')}
      </div>
    </Dialog>
  );
};
