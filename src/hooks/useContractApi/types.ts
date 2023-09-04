import { ContractType, Network } from '@cryptodo/contracts';

import { Request as CreateContractForm } from '@/api/contracts/mutations/createContract/types';

export interface ContractInterimData {
  id: string;
  txId: string;
  payableAmount: string;
}

export interface UseContractProps {
  value?: number;
  form?: CreateContractForm;
  testnet: boolean;
  onError?: () => void;
  onSuccess?: () => void;
  initialData?: Partial<ContractInterimData>;
  network?: Network;
  type?: ContractType;
  togglePaySumDialog?: (flag: boolean) => void;
  disableAllFields?: (flag: boolean) => void;
}
