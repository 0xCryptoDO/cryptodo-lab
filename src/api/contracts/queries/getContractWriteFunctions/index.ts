import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import {
  GetContractWriteFunctionsRequest,
  GetContractWriteFunctionsResponse,
} from './types';

export const getWriteContractFunctions =
  (contractsApi: AxiosInstance) =>
  async ({
    address,
    network,
    testnet,
  }: GetContractWriteFunctionsRequest): Promise<GetContractWriteFunctionsResponse> => {
    const { data }: AxiosResponse<GetContractWriteFunctionsResponse> =
      await contractsApi.get(`${urls.CONTRACT_WRITE_FUNCTIONS}/${address}`, {
        params: { network, testnet },
      });
    return data;
  };
