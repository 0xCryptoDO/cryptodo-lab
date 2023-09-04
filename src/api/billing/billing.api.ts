import { useApi } from '@/hooks';
import { newTx, verifyTx } from './mutations';
import { getCost, getLink, getStatistics, getWallet, checkContract } from './queries';

export * from './billing.urls';

export const getBillingApi = () => {
  const billingApi = useApi(process.env.NEXT_PUBLIC_BILLING_API_URL as string);

  return {
    newTx: newTx(billingApi),
    getCost: getCost(billingApi),
    getLink: getLink(billingApi),
    getStatistics: getStatistics(billingApi),
    getWallet: getWallet(billingApi),
    verifyTx: verifyTx(billingApi),
    check: checkContract(billingApi)
  };
};
