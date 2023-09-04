import { useApi } from '@/hooks';
import { checkFaucetAvailability, getContracts, getWriteContractFunctions } from './queries';
import { createContract, getDeployInfo, verifyContract, requestFunds, updateAbi, updateSourceCode } from './mutations';

export * from './contracts.urls';

export const getContractsApi = () => {
  const contractsApi = useApi(
    process.env.NEXT_PUBLIC_CONTRACTS_API_URL as string
  );

  return {
    getContracts: getContracts(contractsApi),
    checkFaucetAvailability: checkFaucetAvailability(contractsApi),
    createContract: createContract(contractsApi),
    getDeployInfo: getDeployInfo(contractsApi),
    verifyContract: verifyContract(contractsApi),
    requestFunds: requestFunds(contractsApi),
    getWriteContractFunctions: getWriteContractFunctions(contractsApi),
    updateAbi: updateAbi(contractsApi),
    updateSourceCode: updateSourceCode(contractsApi),
  };
};
