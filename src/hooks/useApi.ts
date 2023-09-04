import { useEthers } from '@cryptodo/frontend-sdk';

import { buildApi } from '@/api';
import { updateToken } from '@/utils/updateToken';
import { useTypedDispatch } from '@/reduxStore';
import { removeToken, setToken } from '@/reduxStore/slices/auth/authSlice';
import { setBalance } from '@/reduxStore/slices/user/user.slice';

export const useApi = (url: string) => {
  const dispatch = useTypedDispatch();
  const { deactivate, account, library } = useEthers();

  const errorHandler = async () => {
    if (account) {
      try {
        const newToken = await updateToken(library);

        dispatch(setToken(newToken));
      } catch (err) {
        dispatch(setBalance(null));
        deactivate();
        dispatch(removeToken());
      }
    }
  };

  return buildApi(url, errorHandler);
};
