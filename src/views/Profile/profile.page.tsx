import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';

import { urls as billingUrls } from '@/api/billing/billing.api';
import { Loader } from '@/components';
import { useBillingApi } from '@/hooks';
import { useTypedSelector } from '@/reduxStore';

import { ReferralCard } from './components';
import * as S from './profile.page.style';

export const ProfilePage: FC = () => {
  const token = useTypedSelector((state) => state.auth.token);
  
  const { getLink, getStatistics, getWallet } = useBillingApi();
  const { t } = useTranslation('Profile');

  const { data: statisticsData, error: statisticsError } = useSWR(
    token ? [billingUrls.GET_REFERRAL_STATISTICS, token] : null,
    () => getStatistics(),
    {
      shouldRetryOnError: false,
    }
  );
  const { data: linkData, error: linkError } = useSWR(
    token ? [billingUrls.GET_REFERRAL_LINK, token] : null,
    () => getLink(),
    {
      shouldRetryOnError: false,
    }
  );
  const { data: walletData, error: walletError } = useSWR(
    token ? [billingUrls.GET_REFERRAL_WALLET, token] : null,
    () => getWallet(),
    {
      shouldRetryOnError: false,
    }
  );

  const requestsFinished = statisticsData && linkData && walletData;
  const requestsError = statisticsError || linkError || walletError;
  const requestsLoading = !requestsFinished && !requestsError;
  const loadedSuccessfully = requestsFinished && !requestsError;
  return (
    <S.Container>
      <S.Title>{t('title')}</S.Title>
      {requestsLoading ? (
        <Loader width={30} height={30} />
      ) : (
        loadedSuccessfully && (
          <ReferralCard link={linkData} statistics={statisticsData} />
        )
      )}
    </S.Container>
  );
};
