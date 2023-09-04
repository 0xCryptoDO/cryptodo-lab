import { ContractType, Network } from '@cryptodo/contracts';

export const DEFAULT_DECIMALS = 18;

export const academyLinks: Record<ContractType, string> = {
  [ ContractType.erc20Contract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-a-smart-contract-erc-20',
  [ ContractType.erc20DefContract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-a-smart-contract-erc-20',
  [ ContractType.icoContract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-a-smart-contract-ico',
  [ ContractType.erc721Contract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-a-smart-contract-erc-721',
  [ ContractType.daoContract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-dao',
  [ ContractType.lotteryContract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-lottery',
  [ ContractType.airDropContract ]: 'https://docs.cryptodo.app/how-to-use-cryptodo/how-to-create-a-smart-contract-multisender-airdrop',
  [ ContractType.multisigContract ]: '',
  [ ContractType.vestingContract ]: 'https://docs.cryptodo.app/smart-contracts/vesting',
  [ ContractType.stakingContract ]: '',
  [ ContractType.erc4626Contract ]: '',
  [ ContractType.erc1155Contract ]: '',
};

export const networkTranslation = Object.values(Network).reduce(
    (res, network) => {
      res[ network ] = network;
      if (network === Network.okc) {
        res[ network ] = 'OKT';
      }
      if (network === Network.gate) {
        res[ network ] = 'Gate Chain';
      }
      return res;
    },
    {} as Record<Network, string>,
  );

export const REWARDS_BY_PLACE = [
  {
    min: 1,
    max: 1,
    reward: 5000,
  },
  {
    min: 2,
    max: 3,
    reward: 3000,
  },
  {
    min: 4,
    max: 10,
    reward: 1000,
  },
  {
    min: 11,
    max: 30,
    reward: 600,
  },
  {
    min: 31,
    max: 60,
    reward: 400,
  },
  {
    min: 61,
    max: 100,
    reward: 300,
  },
  {
    min: 101,
    max: 300,
    reward: 150,
  },
  {
    min: 301,
    max: 500,
    reward: 100,
  },
  {
    min: 501,
    max: 1000,
    reward: 50,
  },
];
