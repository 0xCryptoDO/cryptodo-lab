import { IVestingOptions } from '@cryptodo/contracts';

import { VestingCalendarItem } from './vestingCalendarItem.interface';
import { VestingPartner } from './vestingPartner.interface';

export interface CreateVestingForm {
  partners: VestingPartner[];
  vestingCalendar: VestingCalendarItem[];
  name: string;
  token: string;
  lockDuration: number;
  options: IVestingOptions;
}
