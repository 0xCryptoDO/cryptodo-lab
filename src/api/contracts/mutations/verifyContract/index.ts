import { AxiosInstance } from 'axios';

import { ContractType } from '@cryptodo/contracts';

import { urls } from '@/api/contracts/contracts.api';

import { Request } from './types';

export * as VerifyContract from './types';

export const verifyContract =
  (contractsApi: AxiosInstance) =>
  async (contractType: ContractType, params: Request): Promise<void> => {
    const url = `${urls.VERIFY_CONTRACT}/${contractType}`;
    await contractsApi.post(url, params, {
      timeout: 0,
    });
  };
