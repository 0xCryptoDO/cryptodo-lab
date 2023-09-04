import { useEffect } from 'react';
import useSWR from 'swr';

import { getQuestsApi } from '@/api/quests';
import { urls as billingUrls } from '@/api/billing';
import { useBillingApi } from '@/hooks';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { setLeaderboard, setQuests, setUserProgress } from '@/views/Rewards/redux/rewards.slice';

export const useQuestsApi = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const dispatch = useTypedDispatch();
  const { getQuestInfo, getQuestProgress, getLeaderboard } = getQuestsApi();
  const { getLink } = useBillingApi();

  const { data: link } = useSWR(
    token ? [ billingUrls.GET_REFERRAL_LINK, token ] : null,
    () => getLink(),
    {
      shouldRetryOnError: false,
    }
  );

  const getQuests = async () => {
    const [ info, progress, leaderboard ] = await Promise.all([
      getQuestInfo(),
      getQuestProgress(),
      getLeaderboard({ limit: 50, offset: 0 }),
    ]);

    dispatch(setQuests(info));
    dispatch(setUserProgress(progress));
    dispatch(setLeaderboard({
      items: leaderboard.items || [],
      count: leaderboard.count || 0,
    }));
  };

  const refreshUserProgress = async () => {
    const progress = await getQuestProgress();
    dispatch(setUserProgress(progress));
  }

  useEffect(() => {
    if (token) {
      getQuests();
    }
  }, [ token ]);

  return { link, refreshUserProgress };
};
