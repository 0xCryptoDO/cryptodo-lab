import { AxiosInstance } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { UpdateAbiRequest } from './types';

export const updateAbi =
  (contractsApi: AxiosInstance) => async (params: UpdateAbiRequest) =>
    contractsApi.post(`${urls.UPDATE_ABI}`, params, {
      timeout: 30000,
    });
