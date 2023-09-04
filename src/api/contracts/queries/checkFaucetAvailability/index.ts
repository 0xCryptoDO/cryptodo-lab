import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { Response, Request } from './types';

export * as CheckFaucet from './types';

export const checkFaucetAvailability =
  (contractsApi: AxiosInstance) =>
  async (request: Request): Promise<Response> => {
    const { data }: AxiosResponse<Response> = await contractsApi.get(
      urls.FAUCET_AVAILABE,
      { params: request }
    );
    return data;
  };
