import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { urls } from '@/api/users';

import { getCurrentUser } from '..';

describe('getCurrentUser', () => {
  it('should get the current user from server', async () => {
    const data = { currentUser: 'fgg564hghfgh' };

    const getMock = jest.fn().mockReturnValue({ data });

    const axiosInstance = {
      get: getMock,
    };

    const api = getCurrentUser(axiosInstance as unknown as AxiosInstance);
    const result = await api();

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.CURRENT_USER);
    expect(result).toBe(data);
  });
});
