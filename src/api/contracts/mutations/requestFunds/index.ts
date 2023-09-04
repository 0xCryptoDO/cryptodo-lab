import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { RequestFundsRequest, RequestFundsResponse } from './types';

export * as RequestFunds from './types';

export const requestFunds =
  (contractsApi: AxiosInstance) =>
  async (params: RequestFundsRequest): Promise<RequestFundsResponse> => {
    const res: AxiosResponse<RequestFundsResponse> = await contractsApi.post(
      urls.FAUCET,
      params,
      {
        timeout: 30000,
      }
    );

    return res.data;
  };
