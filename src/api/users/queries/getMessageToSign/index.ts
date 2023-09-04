import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/users/users.api';

import { Request, Response } from './types';

export * as GetMessageToSign from './types';

export const getMessageToSign =
  (usersApi: AxiosInstance) =>
  async (params: Request): Promise<Response> => {
    const { data }: AxiosResponse<Response> = await usersApi.get(
      urls.GET_MESSAGE_TO_SIGN,
      {
        params: params as Record<string, any>,
      }
    );

    return data;
  };
