import { IMultisigOptions } from '@cryptodo/contracts';

import { MultisigOwner } from './multisigOwner.interface';

export interface CreateMultisigForm {
  name: string;
  targetContract: string;
  quorum: number;
  owners: MultisigOwner[];
  functionNames: string[];
  options: IMultisigOptions;
}
