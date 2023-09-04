import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { SetTweetLinkFundsRequest } from './types';

export const setTweetLink =
  (contractsApi: AxiosInstance) =>
  async (params: SetTweetLinkFundsRequest): Promise<void> => {
    const res: AxiosResponse<void> = await contractsApi.post(
      urls.TWEET,
      params,
      {
        timeout: 30000,
      }
    );

    return res.data;
  };
