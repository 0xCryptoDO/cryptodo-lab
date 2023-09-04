import { IUserQuest, IUserQuestResponse, Quests } from '@cryptodo/contracts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiStore {
  isModalOpen: boolean;
}

interface LeaderboardStore {
  items: IUserQuest[];
  page: number;
  count: number;
}

interface RewardsInitialState {
  ui: UiStore;
  quests: Quests;
  userProgress: IUserQuestResponse | null;
  leaderboard: LeaderboardStore;
}

const initialState: RewardsInitialState = {
  ui: {
    isModalOpen: false,
  },
  quests: {},
  userProgress: null,
  leaderboard: {
    items: [],
    page: 1,
    count: 0,
  },
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    setQuestModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.ui.isModalOpen = payload;
    },
    setQuests(state, { payload }: PayloadAction<Quests>) {
      state.quests = payload;
    },
    setUserProgress(state, { payload }: PayloadAction<IUserQuestResponse>) {
      if (state.userProgress) {
        state.userProgress = { ...state.userProgress, ...payload };
      } else {
        state.userProgress = payload;
      }
    },
    setLeaderboard(state, { payload }: PayloadAction<Partial<LeaderboardStore>>) {
      state.leaderboard = { ...state.leaderboard, ...payload };
    },
  },
});

export const { setQuestModalOpen, setQuests, setUserProgress, setLeaderboard } =
  rewardsSlice.actions;
export default rewardsSlice.reducer;
