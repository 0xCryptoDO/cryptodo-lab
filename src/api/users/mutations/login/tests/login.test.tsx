import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { urls } from '@/api/users';

import { login } from '..';

describe('login', () => {
  it('should send a request to the server', async () => {
    const postMock = jest
      .fn()
      .mockReturnValue({ data: { accessToken: 'r23rfd' } });

    const axiosInstance = {
      post: postMock,
    };

    const api = login(axiosInstance as unknown as AxiosInstance);
    const result = await api({ wallet: 'dsadasd', signature: 'dasd' });

    expect(postMock).toBeCalledTimes(1);
    expect(postMock).toBeCalledWith(urls.LOGIN, {
      signature: 'dasd',
      wallet: 'dsadasd',
    });
    expect(result).toBe('r23rfd');
  });
});
