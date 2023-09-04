import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/ai/ai.urls';

import { Request, Response } from './getCodeByMessages.types';

export const getCodeByMessages =
  (aiApi: AxiosInstance) =>
  async (params: Request): Promise<Response> => {
    const { data }: AxiosResponse<Response> = await aiApi.post(
      urls.GET_CODE_BY_MESSAGES,
      {
        ...params,
      }
    );

    return data;
  };
