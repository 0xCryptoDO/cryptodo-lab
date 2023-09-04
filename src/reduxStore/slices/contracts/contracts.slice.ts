import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ContractType,
  Currencies,
  IERC20Contract,
  Network,
} from '@cryptodo/contracts';
import { Nullable } from '@/types';

interface CreateToken {
  network: Network;
  contractType: ContractType;
  retryFunction?: () => any;
}

interface Payment {
  network: Network;
  currency: Currencies;
}

interface ContractsInitialState {
  createToken: CreateToken;
  payment: Payment;
  contracts: IERC20Contract[];
  changeAllFieldDisabled: Nullable<(value: boolean) => void>,
}

const initialState: ContractsInitialState = {
  contracts: [],
  changeAllFieldDisabled: null,
  createToken: {
    network: Network.bsc,
    contractType: ContractType.erc20Contract,
  },
  payment: {
    network: Network.bsc,
    currency: Currencies.bnb,
  },
};

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setPaymentNetwork(state, { payload }: PayloadAction<Network>) {
      state.payment.network = payload;
    },
    setPaymentCurrency(state, { payload }: PayloadAction<Currencies>) {
      state.payment.currency = payload;
    },
    setRetryFunction(state, { payload }: PayloadAction<() => any>) {
      state.createToken.retryFunction = payload;
    },
    setContractNetwork(state, { payload }: PayloadAction<Network>) {
      state.createToken.network = payload;
    },
    setContractType(state, { payload }: PayloadAction<ContractType>) {
      state.createToken.contractType = payload;
    },
    setContracts(state, { payload }: PayloadAction<IERC20Contract[]>) {
      state.contracts = payload;
    },
    setChangeAllFieldDisabledFunction(state, { payload }: PayloadAction<(value: boolean) => void>) {
      state.changeAllFieldDisabled = payload;
    }
  },
});

export const {
  setPaymentNetwork,
  setPaymentCurrency,
  setContractNetwork,
  setContractType,
  setContracts,
  setRetryFunction,
  setChangeAllFieldDisabledFunction,
} = contractsSlice.actions;

export default contractsSlice.reducer;
