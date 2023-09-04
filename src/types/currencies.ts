import { Currencies } from '@cryptodo/contracts';
import { ReactNode } from 'react';

export interface CurrencyMeta {
  name: string;
  symbol: Currencies;
  logo: ReactNode;
  disabled?: boolean;
}
