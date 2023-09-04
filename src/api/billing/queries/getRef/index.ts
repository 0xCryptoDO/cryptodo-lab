import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/billing';

import { StatisticsResponse, LinkResponse, WalletResponse } from './types';

export const getStatistics =
  (billingApi: AxiosInstance) => async (): Promise<StatisticsResponse> => {
    const { data }: AxiosResponse<StatisticsResponse> = await billingApi.get(
      urls.GET_REFERRAL_STATISTICS
    );

    return data;
  };

export const getLink =
  (billingApi: AxiosInstance) => async (): Promise<string> => {
    const { data }: AxiosResponse<LinkResponse> = await billingApi.get(
      urls.GET_REFERRAL_LINK
    );

    return data.referralLink;
  };

export const getWallet =
  (billingApi: AxiosInstance) => async (): Promise<string> => {
    const { data }: AxiosResponse<WalletResponse> = await billingApi.get(
      urls.GET_REFERRAL_WALLET
    );

    return data.referralUserWallet;
  };
