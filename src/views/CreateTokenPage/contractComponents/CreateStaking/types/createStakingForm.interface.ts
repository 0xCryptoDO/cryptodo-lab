import { IStakingOptions } from '@cryptodo/contracts';

import { StakingTariff } from './stakingTariff.interface';

export interface CreateStakingForm {
  name: string;
  token: string;
  minStake: number;
  maxStake: number;
  tariffs: StakingTariff[];
  options: IStakingOptions;
}
