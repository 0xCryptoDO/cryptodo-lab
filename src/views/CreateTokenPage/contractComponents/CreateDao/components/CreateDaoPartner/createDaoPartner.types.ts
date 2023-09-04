import { DaoPartner } from '@/views/CreateTokenPage/contractComponents/CreateDao/types/daoPartner.interface';

export interface CreateDaoPartnerProps {
  partner: any;
  index: number;
  errors: any;
  allFieldsDisabled: boolean;
  register: any;
  computedGTAmount: number;
  fields: DaoPartner[];
  remove: (index: number) => void;
  updatePartners: any;
}
