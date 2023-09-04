import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { Response } from './types';

export * as GetContracts from './types';

export const getContracts =
  (contractsApi: AxiosInstance) => async (): Promise<Response> => {
    try {
      const { data }: AxiosResponse<Response> = await contractsApi.get(
        urls.GET_CONTRACTS
      );

      return data;
    } catch (err) {
      return [];
    }
  };
