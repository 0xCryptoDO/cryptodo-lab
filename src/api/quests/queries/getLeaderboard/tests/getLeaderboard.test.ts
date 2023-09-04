import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { urls } from '@/api/quests';

import { getLeaderboard } from '..';

describe('getLeaderboard', () => {
  it('should send a request to the server', async () => {
    const data = { a: 'dasdasdczx' };

    const getMock = jest.fn().mockReturnValue({ data });

    const axiosInstance = {
      get: getMock,
    };

    const limit = 30;
    const offset = 20;

    const api = getLeaderboard(axiosInstance as unknown as AxiosInstance);
    const result = await api({ limit, offset });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_QUESTS_LEADERBOARD, {
      params: { limit, offset },
    });
    expect(result).toBe(data);
  });
});
