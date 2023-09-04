import useSWRImmutable from 'swr/immutable';

import {
  Currencies,
  ContractType,
  CombinedContractOptions,
} from '@cryptodo/contracts';

import { Loader } from '@/components';
import { urls } from '@/api/billing/billing.api';
import { useBillingApi } from '@/hooks/useBillingApi';
import { useTypedSelector } from '@/reduxStore';
import { Nullable } from '@/types';

export const useContractCost = ({
  currency,
  token,
  preventFetching,
  type,
  options,
}: {
  currency: Currencies;
  token: Nullable<string>;
  preventFetching?: boolean;
  type: ContractType;
  options?: CombinedContractOptions;
}) => {
  const paymentNetwork = useTypedSelector((state) => state.contracts.payment.network);
  
  const { getCost } = useBillingApi();
  const {
    data: cost,
    error: costError,
    isValidating,
  } = useSWRImmutable(
    token && !preventFetching
      ? [
          urls.GET_COST,
          {
            type,
            currency,
            network: paymentNetwork
          },
          token,
          options,
        ]
      : null,
    (_, params, token, options) => getCost(params, options)
  );
  const contractCost = `${cost?.total.toFixed(
    currency === Currencies.usd ? 2 : 6
  )} ${currency}`;

  return {
    value: cost?.total,
    options: cost?.options || {},
    originalCost:
      (cost?.usdEq || 0) -
        Object.values(cost?.options || {}).reduce(
          (sum: number, el: unknown) => el as number + sum,
          0
        ) || 0,
    usdEq: cost?.usdEq || 0,
    isValidating,
    el: !cost && !costError ? <Loader width={18} height={18} /> : contractCost,
  };
};
