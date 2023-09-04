import { AxiosInstance } from 'axios';

import { urls } from '@/api/contracts/contracts.api';

import { setTweetLink } from '..';

describe('setTweetLink', () => {
  it('should set tweet link', async () => {
    const postMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      post: postMock,
    };

    const tweetLink = 'rewy456436543';

    const api = setTweetLink(axiosInstance as unknown as AxiosInstance);
    const result = await api({
      tweetLink,
    });

    expect(postMock).toBeCalledTimes(1);
    expect(postMock).toBeCalledWith(
      urls.TWEET,
      {
        tweetLink,
      },
      { timeout: 30000 }
    );
    expect(result).toBe(1);
  });
});
