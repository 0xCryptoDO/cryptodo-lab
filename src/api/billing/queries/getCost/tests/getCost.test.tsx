import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';
import { ContractType,Network } from '@cryptodo/contracts/lib/constants';

import { getCost } from '@/api/billing/queries';

describe('getCost', () => {
  it('should send a request to the server with options', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 3 });

    const axiosInstance = {
      get: getMock,
    };
    
    const options = {
      burn: true,
      blacklist: true,
    }

    const api = getCost(axiosInstance as unknown as AxiosInstance);
    const result = await api({ currency: 'usdt', network: Network.bsc, type: ContractType.erc20Contract }, options);

    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(3);
  });

  it('should send a request to the server with options but without options with false value', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 3 });

    const axiosInstance = {
      get: getMock,
    };

    const options = {
      burn: false,
      blacklist: true,
    }

    const api = getCost(axiosInstance as unknown as AxiosInstance);
    const result = await api({ currency: 'usdt', network: Network.bsc, type: ContractType.erc20Contract }, options);
    
    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(3);
  });

  it('should send a request to the server without options', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 3 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getCost(axiosInstance as unknown as AxiosInstance);
    const result = await api({ currency: 'usdt', network: Network.bsc, type: ContractType.erc20Contract });

    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(3);
  });
});
