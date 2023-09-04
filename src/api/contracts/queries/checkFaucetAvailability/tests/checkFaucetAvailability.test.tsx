import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { Network } from '@cryptodo/contracts';

import { checkFaucetAvailability } from '@/api/contracts/queries';

describe('checkFaucetAvailability', () => {
  it('should send a request to the server', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 13 });

    const kyInstance = {
      get: getMock,
    };

    const api = checkFaucetAvailability(kyInstance as unknown as AxiosInstance);
    const result = await api({ address: 'add', network: Network.aurora });

    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(13);
  });
});
