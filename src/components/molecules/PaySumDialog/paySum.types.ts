import { CombinedContractOptions, ContractType } from '@cryptodo/contracts';

export interface PaySumDialogProps {
  options?: CombinedContractOptions;
  testnet: boolean;
  open: boolean;
  toggle: (open: boolean) => void;
  submit: (id?: string) => void;
  approve?: (amount: number) => void;
  approvedAmount?: string;
  approveLoading?: boolean;
  id?: string;
  type: ContractType;
  onClose?: () => void;
}
