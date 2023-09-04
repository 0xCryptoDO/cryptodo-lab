import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { urls } from '@/api/quests';

import { getQuestInfo } from '..';

describe('getQuestInfo', () => {
  it('should send a request to the server', async () => {
    const data = { ga: 22 };

    const getMock = jest.fn().mockReturnValue({ data });

    const axiosInstance = {
      get: getMock,
    };

    const api = getQuestInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api();

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_QUESTS_INFO);
    expect(result).toBe(data);
  });
});
