import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@/types';

interface AuthInitialState {
  token: Nullable<string>;
}

const initialState: AuthInitialState = {
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem('jwt', payload);
      state.token = payload;
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem('jwt');
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
