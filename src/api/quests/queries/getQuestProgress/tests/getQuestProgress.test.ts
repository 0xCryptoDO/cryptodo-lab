import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { urls } from '@/api/quests';

import { getQuestProgress } from '..';

describe('getQuestProgress', () => {
  it('should send a request to the server', async () => {
    const data = { ttt: '333dasdasdz' };

    const getMock = jest.fn().mockReturnValue({ data });

    const axiosInstance = {
      get: getMock,
    };

    const api = getQuestProgress(axiosInstance as unknown as AxiosInstance);
    const result = await api();

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_QUEST_PROGRESS);
    expect(result).toBe(data);
  });
});
