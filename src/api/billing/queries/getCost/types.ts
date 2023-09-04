import { ContractType, Network } from '@cryptodo/contracts';

export interface Request {
  type: ContractType;
  currency: string;
  network: Network;
}
export interface Response {
  total: number;
  options: any;
  usdEq: number;
}
