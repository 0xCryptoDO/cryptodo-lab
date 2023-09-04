import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/ai/ai.urls';

import { Request, Response } from './assembleCode.types';

export const assembleCode =
  (aiApi: AxiosInstance) =>
    async (params: Request): Promise<Response> => {
      const { data }: AxiosResponse<Response> = await aiApi.post(
        urls.ASSEMBLE_CODE,
        {...params}
      );

      return data;
    };
