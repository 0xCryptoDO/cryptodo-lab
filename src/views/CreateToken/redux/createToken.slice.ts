import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractType, LotteryType } from '@cryptodo/contracts';
import {
  AirDropForm,
  ContractForm,
  DaoForm,
  Erc20ContractForm,
  Erc20DefContractForm,
  Erc721ContractForm,
  Erc1155ContractForm,
  Erc4626ContractForm,
  IcoForm,
  LotteryForm,
  MultisigForm,
  StakingForm,
  VestingForm,
} from '@/types';

interface CreateTokenInitialState {
  [ContractType.erc20Contract]: Erc20ContractForm;
  [ContractType.erc20DefContract]: Erc20DefContractForm;
  [ContractType.erc721Contract]: Erc721ContractForm;
  [ContractType.erc1155Contract]: Erc1155ContractForm;
  [ContractType.erc4626Contract]: Erc4626ContractForm;
  [ContractType.lotteryContract]: LotteryForm;
  [ContractType.airDropContract]: AirDropForm;
  [ContractType.daoContract]: DaoForm;
  [ContractType.icoContract]: IcoForm;
  [ContractType.vestingContract]: VestingForm;
  [ContractType.stakingContract]: StakingForm;
  [ContractType.multisigContract]: MultisigForm;
}

export const initialLotteries = {
  [LotteryType.winWin]: {
    winners: [50, 30, 20],
    rewards: [60, 30, 10],
    minRows: 3,
  },
  [LotteryType.allOrNothing]: {
    winners: [10, 20, 70],
    rewards: [50, 30, 20],
    minRows: 3,
  },
  [LotteryType.custom]: {
    winners: [50, 50],
    rewards: [50, 50],
    minRows: 2,
  },
  [LotteryType.draw]: {
    winners: [50, 50],
    rewards: [50, 50],
    minRows: 2,
  },
};

const initialState: CreateTokenInitialState = {
  [ContractType.erc20Contract]: {
    options: {
      burn: false,
      blacklist: false,
      pause: false,
    },
  },
  [ContractType.erc20DefContract]: {
    options: {
      burn: false,
      blacklist: false,
      pause: false,
    },
  },
  [ContractType.erc721Contract]: {
    options: {
      incrementTokenMaxAmount: false,
      presale: false,
    },
  },
  [ContractType.erc1155Contract]: {
    options: {},
  },
  [ContractType.erc4626Contract]: {
    options: {},
  },
  [ContractType.lotteryContract]: {
    lotteryType: null,
    lotteries: initialLotteries,
    options: {},
  },
  [ContractType.vestingContract]: {
    vestingType: null,
    options: {},
  },
  [ContractType.airDropContract]: {
    airDropType: null,
    options: {},
  },
  [ContractType.stakingContract]: {
    options: {},
  },
  [ContractType.multisigContract]: {
    options: {},
  },
  [ContractType.daoContract]: {
    options: {},
  },
  [ContractType.icoContract]: {
    options: {},
  },
};

const creteTokenSlice = createSlice({
  name: 'createToken',
  initialState,
  reducers: {
    reset(state) {
      state[ContractType.erc20Contract] =
        initialState[ContractType.erc20Contract];
      state[ContractType.erc20DefContract] =
        initialState[ContractType.erc20DefContract];
      state[ContractType.stakingContract] =
        initialState[ContractType.stakingContract];
      state[ContractType.erc721Contract] =
        initialState[ContractType.erc721Contract];
      state[ContractType.airDropContract] =
        initialState[ContractType.airDropContract];
      state[ContractType.lotteryContract] =
        initialState[ContractType.lotteryContract];
      state[ContractType.vestingContract] =
        initialState[ContractType.vestingContract];
      state[ContractType.daoContract] = initialState[ContractType.daoContract];
      state[ContractType.multisigContract] =
        initialState[ContractType.multisigContract];
      state[ContractType.icoContract] = initialState[ContractType.icoContract];
    },
    changeErc20Form(state, { payload }: PayloadAction<Partial<Erc20ContractForm>>) {
      state[ContractType.erc20Contract] = { ...state[ContractType.erc20Contract], ...payload };
    },
    changeErc20DefForm(state, { payload }: PayloadAction<Partial<Erc20DefContractForm>>) {
      state[ContractType.erc20DefContract] = { ...state[ContractType.erc20DefContract], ...payload };
    },
    changeErc721Form(state, { payload }: PayloadAction<Partial<Erc721ContractForm>>) {
      state[ContractType.erc721Contract] = { ...state[ContractType.erc721Contract], ...payload };
    },
    changeMultisigForm(state, { payload }: PayloadAction<Partial<MultisigForm>>) {
      state[ContractType.multisigContract] = { ...state[ContractType.multisigContract], ...payload };
    },
    changeDaoForm(state, { payload }: PayloadAction<Partial<DaoForm>>) {
      state[ContractType.daoContract] = { ...state[ContractType.daoContract], ...payload };
    },
    changeIcoForm(state, { payload }: PayloadAction<Partial<IcoForm>>) {
      state[ContractType.icoContract] = { ...state[ContractType.icoContract], ...payload };
    },
    changeLotteryForm(state, { payload }: PayloadAction<Partial<LotteryForm>>) {
      state[ContractType.lotteryContract] = { ...state[ContractType.lotteryContract], ...payload };
    },
    changeAirDropForm(state, { payload }: PayloadAction<Partial<AirDropForm>>) {
      state[ContractType.airDropContract] = { ...state[ContractType.airDropContract], ...payload };
    },
    changeVestingForm: (
      state,
      { payload }: PayloadAction<Partial<VestingForm>>,
    ) => {
      state[ContractType.vestingContract] = { ...state[ContractType.vestingContract], ...payload };
    },
    changeStakingForm(state, { payload }: PayloadAction<Partial<StakingForm>>) {
      state[ContractType.stakingContract] = { ...state[ContractType.stakingContract], ...payload };
    },
    changeForm(state, { payload }: PayloadAction<{ data: Partial<ContractForm>, type: ContractType }>) {
      state[payload.type] = { ...state[payload.type], ...payload.data } as any;
    },
  },
});

export const {
  changeAirDropForm,
  changeLotteryForm,
  changeVestingForm,
  changeStakingForm,
  changeDaoForm,
  changeErc721Form,
  changeErc20DefForm,
  changeMultisigForm,
  changeErc20Form,
  changeIcoForm,
  reset,
  changeForm,
} = creteTokenSlice.actions;
export default creteTokenSlice.reducer;
