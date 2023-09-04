import { AppLoader, ContractCreated, ContractStatus } from '@/components';
import { CreateTokenDialog } from '@/views/SmartContracts/components';

export const Dialogs = () => (
  <>
    <CreateTokenDialog/>
    <AppLoader/>
    <ContractStatus/>
    <ContractCreated/>
  </>
);
