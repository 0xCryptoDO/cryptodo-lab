import { AxiosInstance } from 'axios';

import { urls } from '@/api/quests/quests.urls';

import { GetLeaderboardParams } from './types';

export const getLeaderboard =
  (api: AxiosInstance) => async (params: GetLeaderboardParams) => {
    try {
      const { data } = await api.get(urls.GET_QUESTS_LEADERBOARD, { params });

      return data;
    } catch (error) {
      return null;
    }
  };
