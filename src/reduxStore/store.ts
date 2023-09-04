import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/reduxStore/slices/auth/authSlice';
import userSlice from '@/reduxStore/slices/user/user.slice';
import contractsSlice from '@/reduxStore/slices/contracts/contracts.slice';
import uiSlice from '@/reduxStore/slices/ui/ui.slice';
import createTokenSlice from '@/views/CreateToken/redux/createToken.slice';
import smartContractsSlice from '@/views/SmartContracts/redux/smartContracts.slice';
import rewardsSlice from '@/views/Rewards/redux/rewards.slice';
import profileSlice from '@/views/Profile/redux/profile.slice';
import daoSlice from '@/views/Dao/redux/dao.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    contracts: contractsSlice,
    ui: uiSlice,
    createToken: createTokenSlice,
    smartContracts: smartContractsSlice,
    rewards: rewardsSlice,
    profile: profileSlice,
    dao: daoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
