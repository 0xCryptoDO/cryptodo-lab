import { useEffect } from 'react';
import { useMedia, usePreviousDistinct } from 'react-use';
import useTranslation from 'next-translate/useTranslation';
import { toast } from 'react-toastify';

import { useEthers } from '@cryptodo/frontend-sdk';

import { Dialog, Tooltip } from '@/components';
import { InfoIcon, MetamaskIcon, WalletConnectIcon } from '@/assets/icons';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleConnectDialog, toggleLoading } from '@/reduxStore/slices/ui/ui.slice';

import * as S from './connectWallet.style';

const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: <MetamaskIcon />,
    tooltip: 'Connect wallet using MetaMask browser extension.',
  },
  {
    id: 'walletconnect',
    name: 'Wallet Connect',
    icon: <WalletConnectIcon />,
    disabled: true,
    tooltip:
      'Connect your wallet from any of your devices. Desktop, tablet, phone, etc.',
  },
];

export const ConnectWalletDialog = () => {
  const connectDialogOpen = useTypedSelector((state) => state.ui.connectDialogOpen);
  const appLoading = useTypedSelector((state) => state.ui.appLoading);
  
  const dispatch = useTypedDispatch();
  const isMobile = useMedia('(max-width: 769px)', false);
  const { activateBrowserWallet, account, isLoading, error } = useEthers();
  const prevAccount = usePreviousDistinct(account);

  const { t } = useTranslation('common');

  const connectWallet = async (wallet: string) => {
    try {
      dispatch(toggleLoading({
        is: true,
        message: t('connectingWallet'),
      }));

      // TODO: export to crypto utils
      switch (wallet) {
        case 'walletconnect': {
          await activateBrowserWallet({ type: 'walletConnect' });
          break;
        }
        case 'metamask':
        default: {
          await activateBrowserWallet({ type: 'metamask' });
          break;
        }
      }
      dispatch(toggleConnectDialog(false));
    } catch (err) {
      toggleLoading({
        is: false,
      });
      throw new Error('Error when connecting wallet');
    }
  };

  useEffect(() => {
    // Remove loading once wallet connected
    if (prevAccount === undefined && account) {
      toggleLoading({
        is: false,
      });
    }
  }, [ account ]);

  useEffect(() => {
    if (error?.message.includes('Non configurable')) {
      toast.error(error?.message);
    }
  }, [ error ]);

  useEffect(() => {
    if (!account && error && !isLoading && appLoading) {
      toggleLoading({
        is: false,
      });
    }
  }, [ error, account, isLoading ]);

  return (
    <Dialog
      open={connectDialogOpen}
      onOpenChange={(open) => {
        dispatch(toggleConnectDialog(Boolean(open)));
      }}
      css={{ width: isMobile ? 'calc(100% - 40px)' : 'auto', borderRadius: '8px' }}
      title={t('connectWallet')}
      closeIcon
    >
      <S.DialogContent style={{borderRadius: '8px'}}>
        <S.DialogContentTitle>
          {t('chooseWallet')}
          <span>*</span>
        </S.DialogContentTitle>
        <S.WalletList>
          {wallets.map((wallet) => {
            const { id, name, icon, tooltip, disabled } = wallet;
            return (
              <S.Wallet
                disabled={disabled}
                key={id}
                onClick={() => {
                  if(!disabled){
                    connectWallet(id);
                  }
                }}
              >
                {icon}
                {name}
                { disabled ? <div>{ t('soon') }</div> : null }
                <Tooltip content={tooltip}>
                  <S.WalletInfo>
                    <InfoIcon />
                  </S.WalletInfo>
                </Tooltip>
              </S.Wallet>
            );
          })}
        </S.WalletList>
      </S.DialogContent>
    </Dialog>
  );
};
