import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@/types/nullable';
import { IdentIconsId } from '@/types';
import { randomIntFromInterval } from '@/utils';

interface UserInitialState {
  balance: Nullable<number>;
  iconId: IdentIconsId;
}

const initialState: UserInitialState = {
  balance: null,
  iconId: randomIntFromInterval(1, 10) as IdentIconsId,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBalance(state, { payload }: PayloadAction<Nullable<number>>) {
      state.balance = payload;
    },
    generateIconId(state) {
      state.iconId = randomIntFromInterval(1, 10) as IdentIconsId;
    },
  },
});

export const { setBalance, generateIconId } = userSlice.actions;

export default userSlice.reducer;
