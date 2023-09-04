import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { useAuth, useEthers, useWallet } from '@cryptodo/frontend-sdk';
import { rpcUrls } from '@cryptodo/contracts';

import { useUsersApi } from '@/hooks';
import { useTypedSelector } from '@/reduxStore';
import {
  generateIconId,
  setBalance,
} from '@/reduxStore/slices/user/user.slice';
import {
  toggleLoading,
  toggleSignMessageDialog,
} from '@/reduxStore/slices/ui/ui.slice';
import { Nullable } from '@/types';
import { setToken } from '@/reduxStore/slices/auth/authSlice';

export const useReusable = () => {
  const token = useTypedSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const { account } = useEthers();
  const { query, isReady } = useRouter();
  const { getMessageToSign, login } = useUsersApi();

  const { t } = useTranslation('common');
  const ref = useMemo(() => query?.ref as string, [isReady]);
  const getAccessToken = (wallet: string, signature: string) =>
    login({
      wallet: account as string,
      signature,
      referralUserId: ref,
    });

  const setBalanceAction = (value: Nullable<number>) => {
    dispatch(setBalance(value));
  };

  const toggleLoadingAction = (value: any) => {
    dispatch(toggleLoading(value));
  };

  const generateIconIdAction = () => {
    dispatch(generateIconId());
  };

  const setTokenAction = (value: string) => {
    dispatch(setToken(value));
  };

  const toggleSignMessageDialogAction = (value: boolean) => {
    dispatch(toggleSignMessageDialog(value));
  };

  useWallet({
    setBalanceAction,
    token,
    jsonRpcProviderUrl:
      process.env.NEXT_PUBLIC_IS_TESTNET !== 'true'
        ? rpcUrls.BSC.mainnet
        : rpcUrls.BSC.testnet,
  });

  const { setMessageToSign } = useAuth({
    toggleLoadingAction,
    token,
    setBalanceAction,
    generateIconIdAction,
    getMessageToSign,
    setTokenAction,
    toggleSignMessageDialogAction,
    translatedSigningMessage: t('signingMessage'),
    showNotificationError: (message: string) => {
      toast.error(
        message.includes('user rejected signing')
          ? (t('common:errors.signingRejected') as string)
          : message
      );
    },
    getAccessToken,
  });

  return { setMessageToSign };
};
