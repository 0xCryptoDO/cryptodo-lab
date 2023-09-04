import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractStatus, ContractType, Network, TransactionStatus } from '@cryptodo/contracts';

export interface Filters {
  network: '' | Network;
  type: '' | ContractType;
  status: '' | ContractStatus | TransactionStatus.waitingForPayment;
  search: string;
  isLoading: boolean;
}

const initialState: { filters: Filters } = {
  filters: {
    network: '',
    type: '',
    status: '',
    search: '',
    isLoading: true,
  },
}

const smartContractsSlice = createSlice({
  name: 'smartContracts',
  initialState,
  reducers: {
    filterNetwork(state, { payload }: PayloadAction<'' | Network>) {
      state.filters.network = payload;
    },
    filterStatus(state, { payload }: PayloadAction<'' | ContractStatus>) {
      state.filters.status = payload;
    },
    filterType: (state, { payload }: PayloadAction<'' | ContractType>) => {
      state.filters.type = payload;
    },
    search: (state, { payload }: PayloadAction<string>) => {
      state.filters.search = payload;
    },
  },
});

export const { filterNetwork, filterType, filterStatus, search } = smartContractsSlice.actions; 
export default smartContractsSlice.reducer;
