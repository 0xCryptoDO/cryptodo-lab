import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { getMessageToSign } from '@/api/users/queries';

describe('getMessageToSign', () => {
  it('should send a request to the server', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 12 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getMessageToSign(axiosInstance as unknown as AxiosInstance);
    const result = await api({ wallet: 'dfsdfsdf' });

    expect(getMock).toBeCalledTimes(1);
    expect(result).toBe(12);
  });
});
