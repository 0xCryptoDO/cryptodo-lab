import { IIcoOptions } from '@cryptodo/contracts';

export interface CreateIcoForm {
  name: string;
  token: string;
  price: string;
  lockup: number;
  maxPerWallet: number;
  options: IIcoOptions;
  receiverAddress: string,
  owner: string;
}
