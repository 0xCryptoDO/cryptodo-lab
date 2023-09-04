import { AxiosInstance } from 'axios';

import { urls } from '@/api/quests/quests.urls';

export const getQuestInfo = (api: AxiosInstance) => async () => {
  try {
    const { data } = await api.get(urls.GET_QUESTS_INFO);

    return data;
  } catch (error) {
    return null;
  }
};
