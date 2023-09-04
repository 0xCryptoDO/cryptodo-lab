import { ContractType } from '@cryptodo/contracts';

export interface UpdateSourceCode {
  contractId: string;
  contractType: ContractType;
  sourceCode: string;
}
