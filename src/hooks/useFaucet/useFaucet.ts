import useSWR from 'swr';

import { Network } from '@cryptodo/contracts';

import { getContractsApi } from '@/api/contracts';

export const useFaucet = ({
  address,
  network,
  isRequestFundLoading,
}: {
  address: string;
  network: Network;
  isRequestFundLoading: boolean;
}) => {
  const { requestFunds, checkFaucetAvailability } = getContractsApi();
  const { data: checkFaucetAvailabilityResponse } = useSWR(
    [address, network, isRequestFundLoading],
    () => checkFaucetAvailability({ address, network }),
    {
      shouldRetryOnError: false,
    }
  );
  return {
    requestFunds,
    ...checkFaucetAvailabilityResponse,
  };
};
