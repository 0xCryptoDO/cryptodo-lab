import { CombinedContractOptions, ContractType } from '@cryptodo/contracts';

export interface Request {
  contractId: string;
  testnet: boolean;
  contractType: ContractType
}
export interface Response {
  sourceCode: string;
  constructorArgs: unknown;
  contractName: string;
  compilerVersion: string;
  options?: CombinedContractOptions;
  aiSourceCode?: string;
}
