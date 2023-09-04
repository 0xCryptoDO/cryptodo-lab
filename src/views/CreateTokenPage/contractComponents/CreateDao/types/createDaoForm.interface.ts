import { DaoPartner } from './daoPartner.interface';

export interface CreateDaoForm {
  name: string;
  symbol: string;
  quorum: number;
  partners: DaoPartner[];
}
