import { ILotteryOptions } from '@cryptodo/contracts';

export interface CreateLotteryForm {
  name: string;
  ticketsPriceOrLotteryPool: number;
  ticketsAmount: number;
  startTime: Date;
  endTime: Date;
  ownerFee: number;
  description: string;
  options: ILotteryOptions;
}
