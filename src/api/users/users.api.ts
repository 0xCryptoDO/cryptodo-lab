import { useApi } from '@/hooks';
import { login } from './mutations';
import { getCurrentUser, getMessageToSign } from './queries';

export * from './users.urls';

export const getUsersApi = () => {
  const usersApi = useApi(process.env.NEXT_PUBLIC_USERS_API_URL as string);

  return {
    login: login(usersApi),
    getMessageToSign: getMessageToSign(usersApi),
    getCurrentUser: getCurrentUser(usersApi)
  };
};
