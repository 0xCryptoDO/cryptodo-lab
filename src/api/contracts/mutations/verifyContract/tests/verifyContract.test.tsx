import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';
import { ContractType } from '@cryptodo/contracts/lib/constants';

import { verifyContract } from '@/api/contracts/mutations';

describe('verifyContract', () => {
  it('should send a request to the server', async () => {
    const postMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      post: postMock,
    };

    const api = verifyContract(axiosInstance as unknown as AxiosInstance);
    const result = await api(ContractType.daoContract, { contractId: '312fdsf', hash: '34yhrbuufh' });

    expect(postMock).toBeCalledTimes(1);
    expect(postMock).toBeCalledWith('contracts/verify/DAO_CONTRACT', {
      contractId: '312fdsf',
      hash: '34yhrbuufh',
    }, { timeout: 0 });
    expect(result).toBe(undefined);
  });
});
