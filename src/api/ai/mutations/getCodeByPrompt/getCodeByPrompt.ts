import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/ai/ai.urls';

import { Request, Response } from './getCodeByPrompt.types';

export const getCodeByPrompt =
  (aiApi: AxiosInstance) =>
    async (params: Request): Promise<Response> => {
      const { data }: AxiosResponse<Response> = await aiApi.post(
        urls.GET_CODE_BY_PROMPT,
        {...params, sessionId: 'rieUk8k9Rsg4U2wh4FugNJgmxm1XQ8B3', advance: false}
      );

      return data;
    };
