import * as useRouter from 'next/router';

import * as hooks from '@/hooks/useUsersApi/useUsersApi';
import { updateToken } from '@/utils';

describe('updateToken', () => {
  it('should set an access token to the local storage and return it', async () => {
    jest.spyOn(useRouter, 'useRouter').mockReturnValue({
      asPath: 'asdasd',
      push: jest.fn(),
      query: { ref: 'ref' },
    } as any);
    const message = 'dasgr34t436534gdfg';
    const accessToken = 'dsadzxce52435234524';
    const signature = {
      dsad: 'dasdasd',
    };
    const address = 31233123;

    const getMessageToSignMock = jest.fn().mockReturnValue({ message });
    const loginMock = jest.fn().mockReturnValue(accessToken);
    const getCurrentUserMock = jest.fn().mockReturnValue({ userId: 'userId' });

    const mockInstance = {
      getSigner: () => ({
        getAddress: () => address,
        signMessage: () => signature,
      }),
    };

    jest.spyOn(hooks, 'useUsersApi').mockReturnValue({
      getMessageToSign: getMessageToSignMock,
      login: loginMock,
      getCurrentUser: getCurrentUserMock,
    });

    const setItemMock = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(jest.fn());

    const result = await updateToken(mockInstance);

    expect(result).toBe(accessToken);
    expect(getMessageToSignMock).toBeCalledTimes(1);
    expect(getMessageToSignMock).toBeCalledWith({ wallet: address.toString() });
    expect(loginMock).toBeCalledTimes(1);
    expect(loginMock).toBeCalledWith({
      wallet: address.toString(),
      signature,
      referralUserId: 'ref',
    });
    expect(setItemMock).toBeCalledTimes(1);
    expect(setItemMock).toBeCalledWith('jwt', accessToken);
  });
});
