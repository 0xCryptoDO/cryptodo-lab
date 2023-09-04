import { AiFunction } from '@cryptodo/contracts/lib/types/common-contracts.types';

export interface CreateErc20DefFormInterface {
  initialOwner: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  name: string;
  options: {
    mint?: {
      cap?: number;
    };
    liquidity?: {
      router?: string;
      liquidityFee?: number;
    };
    taxBurn?: {
      burnFee?: number;
    };
    team?: {
      teamFee?: number;
      teamWallet?: string;
    };
    burn?: boolean;
    blacklist?: boolean;
    pause?: boolean;
    aiFunction?: AiFunction;
  };
}
