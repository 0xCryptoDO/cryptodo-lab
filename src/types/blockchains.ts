import { ReactElement } from 'react';

export interface NetworkMeta {
  name: string;
  logo: ReactElement;
  description?: string;
  symbol: string;
  disabled?: boolean;
  paymentsDisabled?: boolean;
}
