import { TransactionStatus } from '@cryptodo/contracts';

import { CombinedContract } from '@/views/SmartContracts/components/SmartContractCard/smartContract.card.types';

export interface Request {}

export type Response = (CombinedContract & {
  transactionStatus?: TransactionStatus;
})[];
