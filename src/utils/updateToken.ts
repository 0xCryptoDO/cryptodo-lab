import { useRouter } from 'next/router';

import { useUsersApi } from '@/hooks';

export const updateToken = async (instance: any): Promise<string> => {
  const { getMessageToSign, login } = useUsersApi();
  const signer = instance.getSigner();
  const wallet = (await signer.getAddress()).toString();
  const data = await getMessageToSign({
    wallet,
  });
  const signature = await signer.signMessage(data.message);
  const { query } = useRouter();
  const accessToken = await login({
    wallet,
    signature,
    referralUserId: (query.ref as string) || undefined,
  });
  localStorage.setItem('jwt', accessToken);
  return accessToken;
};
