import { AiFunction } from '@cryptodo/contracts/lib/types/common-contracts.types';

export interface Erc20Form {
  initialOwner: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  name: string;
  options: {
    mint?: {
      cap?: number;
    };
    burn?: boolean;
    blacklist?: boolean;
    pause?: boolean;
    aiFunction?: AiFunction;
  };
}
