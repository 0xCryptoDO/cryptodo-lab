import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { urls } from '@/api/billing';
import { verifyTx } from '@/api/billing/mutations';

describe('verifyTx', () => {
  it('should send a request to the server', async () => {
    const postMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      post: postMock,
    };

    const api = verifyTx(axiosInstance as unknown as AxiosInstance);
    const result = await api({ transactionId: 'fdsf124', hash: 'af324fyvgsdDQw' });

    expect(postMock).toBeCalledTimes(1);
    expect(postMock).toBeCalledWith(urls.VERIFY_TX, {
      hash: 'af324fyvgsdDQw', transactionId: 'fdsf124',
    }, { timeout: 0 });
    expect(result).toBe(undefined);
  });
});
