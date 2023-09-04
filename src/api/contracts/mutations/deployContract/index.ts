import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { Request, Response } from './types';

export * as DeployContract from './types';

export const getDeployInfo =
  (contractsApi: AxiosInstance) => async (params: Request) => {
    const { data }: AxiosResponse<Response> = await contractsApi.get(
      `${urls.GET_DEPLOY_INFO}`,
      {
        timeout: 30000,
        params,
      }
    );
    return data;
  };
