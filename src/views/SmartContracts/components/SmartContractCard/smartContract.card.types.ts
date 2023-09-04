import {
  CombinedContractOptions,
  ContractType,
  IAirDropContract,
  IDaoContract,
  IERC20Contract,
  IERC20DefContract, IERC721Contract,
  IICOContract,
  ILotteryContract,
  IMultisigContract,
  IStakingContract,
  IVestingContract,
  TransactionStatus,
} from '@cryptodo/contracts';

export type CombinedContract = {
  transactionStatus?: TransactionStatus;
  type: ContractType;
  options: CombinedContractOptions;
} & (IERC20Contract &
  IERC20DefContract &
  IICOContract &
  IDaoContract &
  IERC721Contract &
  ILotteryContract &
  IMultisigContract &
  IVestingContract &
  IStakingContract &
  IAirDropContract);

export interface SmartContractCardProps {
  contract: CombinedContract;
  pay?: (id?: string) => void;
  deploy?: (id?: string, isTestnet?: boolean) => void;
}
