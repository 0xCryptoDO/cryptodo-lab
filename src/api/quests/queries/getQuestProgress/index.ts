import { AxiosInstance } from 'axios';

import { urls } from '@/api/quests/quests.urls';

export const getQuestProgress = (api: AxiosInstance) => async () => {
  try {
    const { data } = await api.get(urls.GET_QUEST_PROGRESS);

    return data;
  } catch (error) {
    return null;
  }
};
