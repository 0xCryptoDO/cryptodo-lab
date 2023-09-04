import { AxiosInstance } from 'axios';

import { urls } from '@/api/contracts';
import { UpdateSourceCode } from '@/api/contracts/mutations/updateSourceCode/types';

export const updateSourceCode =
  (contractsApi: AxiosInstance) =>
    async (params: UpdateSourceCode) => contractsApi.put(
      `${ urls.UPDATE_SOURCE_CODE }`, params, {
        timeout: 30000,
      });
