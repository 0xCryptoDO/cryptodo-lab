import { Network } from '@cryptodo/contracts';

export interface Request {
  currency: string;
  contractId: string;
  network: Network;
}
export interface Response {
  _id: string;
  payableAmount: number;
  currency: string;
  contractId: string;
}
