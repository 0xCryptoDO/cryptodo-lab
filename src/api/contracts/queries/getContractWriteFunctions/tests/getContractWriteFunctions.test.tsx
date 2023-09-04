import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { Network } from '@cryptodo/contracts';

import { getWriteContractFunctions } from '@/api/contracts/queries';

describe('getWriteContractFunctions', () => {
  it('should send a request to the server', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 13 });

    const kyInstance = {
      get: getMock,
    };

    const api = getWriteContractFunctions(
      kyInstance as unknown as AxiosInstance
    );
    const result = await api({
      address: 'add',
      network: Network.aurora,
      testnet: true,
    });

    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(13);
  });
});
