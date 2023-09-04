import { TransactionStatus } from '@cryptodo/contracts';

import { Filters } from '@/views/SmartContracts/redux/smartContracts.slice';

import { CombinedContract } from '../components/SmartContractCard/smartContract.card.types';

const searchContracts = (search: string, contracts: CombinedContract[]) => contracts.filter((contract) => {
  const { address, initialOwner, symbol, name } = contract;

  if (search) {
    const searchLower = search.toLowerCase();
    
    return (
      initialOwner?.toLowerCase().includes(searchLower) ||
      address?.toLowerCase().includes(searchLower) ||
      symbol?.toLowerCase().includes(searchLower) ||
      name?.toLowerCase().includes(searchLower)
    );
  }

  return true;
});

export const filterContracts = (
  filters: Filters,
  contracts: CombinedContract[],
) => searchContracts(filters.search, contracts).filter((contract) => {
  const { network, type, status } = contract;
  let typeMatch = true;
  let networkMatch = true;
  let statusMatch = true;
  if (filters.type) {
    typeMatch = type === filters.type;
  }
  if (filters.network !== '') {
    networkMatch = filters.network === network;
  }
  if (filters.status !== '') {
    if (filters.status === TransactionStatus.waitingForPayment) {
      statusMatch = contract.transactionStatus === TransactionStatus.waitingForPayment;
    } else {
      statusMatch = filters.status === status;
    }
  }
  return typeMatch && networkMatch && statusMatch;
});
