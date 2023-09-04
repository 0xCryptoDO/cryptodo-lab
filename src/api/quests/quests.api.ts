import { useApi } from '@/hooks';
import { getLeaderboard, getQuestInfo, getQuestProgress } from './queries';
import { setTweetLink } from './mutations/setTweetLink/index';

export * from './quests.urls';

export const getQuestsApi = () => {
  const questsApi = useApi(process.env.NEXT_PUBLIC_CONTRACTS_API_URL as string);

  return {
    getQuestInfo: getQuestInfo(questsApi),
    getQuestProgress: getQuestProgress(questsApi),
    getLeaderboard: getLeaderboard(questsApi),
    setTweetLink: setTweetLink(questsApi)
  };
};
