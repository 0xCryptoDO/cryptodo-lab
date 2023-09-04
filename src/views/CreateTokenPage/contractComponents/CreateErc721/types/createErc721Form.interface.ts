import { IERC721Options } from '@cryptodo/contracts';

export interface CreateErc721Form {
  contractName: string;
  totalSupply: number;
  name: string;
  symbol: string;
  tokenPerTx: number;
  tokenPerWallet: number;
  price: number;
  timeForReveal: Date;
  uri: string;
  founder: string;
  owner: string;
  options: IERC721Options;
}
