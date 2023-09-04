import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { Network } from '@cryptodo/contracts';

import { urls } from '@/api/contracts';
import { requestFunds } from '@/api/contracts/mutations';

describe('requestFunds', () => {
  it('should request funds', async () => {
    const postMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      post: postMock,
    };

    const api = requestFunds(axiosInstance as unknown as AxiosInstance);
    const result = await api({
      address: 'add',
      network: Network.aurora,
    });

    expect(postMock).toBeCalledTimes(1);
    expect(postMock).toBeCalledWith(
      urls.FAUCET,
      {
        address: 'add',
        network: Network.aurora,
      },
      { timeout: 30000 }
    );
    expect(result).toBe(1);
  });
});
