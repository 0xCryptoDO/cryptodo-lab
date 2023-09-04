import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { getContracts } from '@/api/contracts/queries';

describe('getContracts', () => {
  it('should send a request to the server', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 13 });

    const kyInstance = {
      get: getMock,
    };

    const api = getContracts(kyInstance as unknown as AxiosInstance);
    const result = await api();

    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(13);
  });
});
