import { AxiosInstance, AxiosResponse } from 'axios';

import { urls } from '@/api/users/users.api';

import { GetCurrentUserResponse } from './types';

export const getCurrentUser =
  (usersApi: AxiosInstance) => async (): Promise<GetCurrentUserResponse> => {
    const { data }: AxiosResponse<GetCurrentUserResponse> = await usersApi.get(
      urls.CURRENT_USER
    );
    return data;
  };
