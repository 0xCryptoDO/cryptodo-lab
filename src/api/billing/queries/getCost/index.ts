import { AxiosInstance, AxiosResponse } from 'axios';
import { CombinedContractOptions } from '@cryptodo/contracts';

import { urls } from '@/api/billing/billing.api';

import { Request, Response } from './types';

export const getCost =
  (billingApi: AxiosInstance) =>
  async (
    params: Request,
    options?: CombinedContractOptions
  ): Promise<Response> => {
    const urlOptions = new URLSearchParams({
      ...params,
    });
    if (options) {
      Object.entries(options).forEach((entry) => {
        if (entry[1]) {
          urlOptions.append('options[]', entry[0]);
        }
      });
    }
    const { data }: AxiosResponse<Response> = await billingApi.get(
      urls.GET_COST,
      {
        params: urlOptions,
      }
    );

    return data;
  };
