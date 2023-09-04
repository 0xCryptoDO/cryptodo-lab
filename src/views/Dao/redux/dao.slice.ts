import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DaoExtendedPartner {
  address: string;
  shares: number;
  percents: number;
}

interface DaoInitialState {
  address: string;
  quorum: number;
  name: string;
  activeTab: number;
  partners: DaoExtendedPartner[];
}

const initialState: DaoInitialState = {
  address: '',
  quorum: 0,
  name: '',
  activeTab: 1,
  partners: [],
}

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setAddress: (state, { payload }: PayloadAction<string>) => {
      state.address = payload;
    },
    setQuorum: (state, { payload }: PayloadAction<number>) => {
      state.quorum = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    setActiveTab: (state, { payload }: PayloadAction<number>) => {
      state.activeTab = payload;
    },
    setPartners: (state, { payload }: PayloadAction<DaoExtendedPartner[]>) => {
      state.partners = payload;
    },
  },
});

export const { setAddress, setName, setQuorum, setPartners, setActiveTab } = daoSlice.actions;
export default daoSlice.reducer;
