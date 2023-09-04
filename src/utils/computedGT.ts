import { DaoPartner } from '@/views/CreateTokenPage/contractComponents/CreateDao/types/daoPartner.interface';

export const computedGT = (partners: DaoPartner[]) =>
  // eslint-disable-next-line no-return-assign
  partners.reduce((sum, partner) => (sum += +partner.GTAmount), 0);

// eslint-disable-next-line consistent-return
export const calcPercent = (computed: number | undefined, amountGT: number) => {
  if (!amountGT) {
    return 0;
  }

  if (computed) {
    return ((amountGT * 100 / computed * 10) / 10).toFixed(2);
  }
};
