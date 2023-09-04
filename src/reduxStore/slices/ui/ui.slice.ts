import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step as ContractStatusStep } from '@/components/molecules/ContractStatus/contractStatus.types';

interface AppLoading {
  is: boolean;
  message?: string;
}

interface ContractStatusDialog {
  is: boolean;
  step?: ContractStatusStep;
  testnet?: boolean;
  errorMessage?: string;
  aiEnabled?: boolean;
  aiFunctionStatus?: boolean;
}

interface UIInitialState {
  headerDropdownOpen: boolean;
  connectDialogOpen: boolean;
  createTokenDialogOpen: boolean;
  appLoading: AppLoading;
  contractStatusDialog: ContractStatusDialog;
  contractCreatedDialogOpen: boolean;
  signMessageDialogOpen: boolean;
}

const initialState: UIInitialState = {
  headerDropdownOpen: false,
  connectDialogOpen: false,
  createTokenDialogOpen: false,
  appLoading: {
    is: false,
  },
  contractStatusDialog: {
    is: false,
  },
  contractCreatedDialogOpen: false,
  signMessageDialogOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDropdown: (state, { payload }: PayloadAction<boolean>) => {
      state.headerDropdownOpen = payload;
    },
    toggleConnectDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.connectDialogOpen = payload;
    },
    toggleCreateTokenDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.createTokenDialogOpen = payload;
    },
    toggleLoading: (state, { payload }: PayloadAction<Partial<AppLoading>>) => {
      state.appLoading = { ...state.appLoading, ...payload };
    },
    toggleContractStatusDialog: (
      state,
      { payload }: PayloadAction<Partial<ContractStatusDialog>>
    ) => {
      state.contractStatusDialog = {
        ...state.contractStatusDialog,
        ...payload,
        errorMessage: payload.errorMessage || undefined,
      };
    },
    toggleContractCreatedDialog: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.contractCreatedDialogOpen = payload;
    },
    toggleSignMessageDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.signMessageDialogOpen = payload;
    },
  },
});

export const {
  toggleDropdown,
  toggleContractCreatedDialog,
  toggleCreateTokenDialog,
  toggleContractStatusDialog,
  toggleConnectDialog,
  toggleSignMessageDialog,
  toggleLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
