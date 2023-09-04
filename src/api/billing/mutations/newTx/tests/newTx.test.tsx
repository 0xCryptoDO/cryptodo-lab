import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';
import { ContractType, Network } from '@cryptodo/contracts/lib/constants';

import { urls } from '@/api/billing/billing.urls';
import { newTx } from '@/api/billing/mutations';

describe('newTx', () => {
  it('should send a request to the server', async () => {
    const postMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      post: postMock,
    };

    const api = newTx(axiosInstance as unknown as AxiosInstance);
    const result = await api(ContractType.erc20Contract, { currency: 'usdt', contractId: '123d', network: Network.bsc });

    expect(postMock).toBeCalledTimes(1);
    expect(postMock).toBeCalledWith(`${urls.NEW_TX}/${ContractType.erc20Contract}`, {
      contractId: '123d', currency: 'usdt', network: Network.bsc
    });
    expect(result).toBe(1);
  });
});
