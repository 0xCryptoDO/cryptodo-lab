import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/users/users.api';

import { Request, Response } from './types';

export * as Login from './types';

export const login =
  (usersApi: AxiosInstance) =>
  async (params: Request): Promise<string> => {
    const { data }: AxiosResponse<Response> = await usersApi.post(
      urls.LOGIN,
      params
    );

    return data.accessToken;
  };
