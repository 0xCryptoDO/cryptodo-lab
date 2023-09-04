import { ContractType } from '@cryptodo/contracts';

export interface CreateTokenPricingProps {
  type: ContractType;
  options: any;
  handleSubmit: (isTestnet: boolean) => Promise<void>;
}
