import { ContractType } from '@cryptodo/contracts';
import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/billing/billing.api';

import { Request, Response } from './types';

export const newTx =
  (billingApi: AxiosInstance) =>
  async (contractType: ContractType, params: Request): Promise<Response> => {
    const { data }: AxiosResponse<Response> = await billingApi.post(
      `${urls.NEW_TX}/${contractType}`,
      params
    );

    return data;
  };
