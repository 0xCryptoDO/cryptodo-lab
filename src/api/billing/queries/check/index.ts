import { AxiosInstance, AxiosResponse } from 'axios';
import { urls } from '@/api/billing/billing.api';

export const checkContract =
  (billingApi: AxiosInstance) =>
  async (
   contractId: string
  ): Promise<boolean> => {
    const { data }: AxiosResponse<boolean> = await billingApi.get(`${urls.CHECK}/${contractId}`);
    return data;
  };
