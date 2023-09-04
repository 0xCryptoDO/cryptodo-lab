import { createSlice } from '@reduxjs/toolkit';

interface ProfileInitialState {
  referral: {
    link: string;
    beenUsedBy: number;
    earned: {
      bnb: number;
      usdt: number;
      cdo: number;
      busd: number;
    };
  };
}

const initialState: ProfileInitialState = {
  referral: {
    link: 'https://cryptodo.com/user-name-referral-link',
    beenUsedBy: 32,
    earned: {
      bnb: 49.0,
      usdt: 56.042078,
      cdo: 24.242017,
      busd: 12.045601,
    },
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
