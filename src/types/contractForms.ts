import {
  IERC20DefOptions,
  IERC721Options,
  IERC1155Options,
  IERC4626Options,
  LotteryType,
  AirDropType, 
  VestingType, 
  IERC20Options,
} from '@cryptodo/contracts';
import { Nullable } from '@/types/nullable';

interface Lottery {
  winners: number[];
  rewards: number[];
  minRows: number;
}

interface CommonOptions {
  aiFunction?: string;
}

export interface Erc20ContractForm {
  options: IERC20Options;
}

export interface Erc20DefContractForm {
  options: IERC20DefOptions & CommonOptions;
}

export interface Erc721ContractForm {
  options: IERC721Options & CommonOptions;
}

export interface Erc4626ContractForm {
  options: IERC4626Options & CommonOptions;
}

export interface Erc1155ContractForm {
  options: IERC1155Options & CommonOptions;
}

export interface LotteryForm {
  lotteryType: Nullable<LotteryType>;
  lotteries: {
    [LotteryType.winWin]: Lottery,
    [LotteryType.allOrNothing]: Lottery,
    [LotteryType.custom]: Lottery,
    [LotteryType.draw]: Lottery,
  };
  options: CommonOptions;
}

export interface AirDropForm {
  airDropType: Nullable<AirDropType>;
  options: CommonOptions;
}

export interface VestingForm {
  vestingType: Nullable<VestingType>;
  options: CommonOptions;
}

export interface StakingForm {
  options: {
    penalty?: number;
  } & CommonOptions;
}

export interface DaoForm {
  options: {
    aiFunction?: string;
  }
}

export interface IcoForm {
  options: CommonOptions;
}

export interface MultisigForm {
  options: CommonOptions;
}

export type ContractForm =
  | Erc20ContractForm
  | Erc20DefContractForm
  | Erc721ContractForm
  | Erc1155ContractForm
  | Erc4626ContractForm
  | LotteryForm
  | AirDropForm
  | VestingForm
  | StakingForm
  | DaoForm
  | IcoForm
  | MultisigForm;
