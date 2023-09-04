import { AxiosInstance } from 'axios';

import { urls } from '@/api/billing/billing.api';

import { Request } from './types';

export const verifyTx =
  (billingApi: AxiosInstance) =>
  async (params: Request): Promise<void> => {
    await billingApi.post(urls.VERIFY_TX, params, {
      timeout: 0,
    });
  };
