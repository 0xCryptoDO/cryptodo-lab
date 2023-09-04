import {
  ContractStatus,
  ContractType,
  Network,
  TransactionStatus,
} from '@cryptodo/contracts';

import { CombinedContract } from '@/views/SmartContracts/components/SmartContractCard/smartContract.card.types';
import { filterContracts } from '@/views/SmartContracts/utils';

const firstContract: CombinedContract = {
  testnet: false,
  address: 'dasdczxczxcfdeewgfeguh4fsd',
  createdAt: new Date(1),
  decimals: 0.6,
  testnetAddress: 'xzczxczxcczxczxc24321345443543534',
  _id: 1,
  userId: 2,
  symbol: 'btc',
  verified: true,
  sourceCode: 'dasd12321',
  status: ContractStatus.deployed,
  type: ContractType.erc20DefContract,
  initialOwner: 'dcxzczxczx5534',
  totalSupply: '2',
  maxPerWallet: 3,
  name: 'rewrewr-132413-ascsac',
  transactionStatus: TransactionStatus.paid,
  network: Network.bsc,
  options: {},
  abi: '',
  lockup: 3,
  price: 5,
  contractName: 'asdasd',
  quorum: 1,
  partners: [],
  shares: [],
} as any;

const secondContract: CombinedContract = {
  testnet: false,
  address: 'dvxcvcxvxcvxcvsdf',
  createdAt: new Date(1),
  decimals: 0.6,
  testnetAddress: 'xzczxczxcczxczxc24321345443543534',
  _id: 1,
  userId: 2,
  symbol: 'wqe',
  verified: true,
  sourceCode: 'dasd12321',
  status: ContractStatus.waitingForDeployment,
  type: ContractType.erc20DefContract,
  initialOwner: 'dcxzczxczx5534',
  totalSupply: '2',
  maxPerWallet: 3,
  name: 'rtetyeirtyier-52345345-czxc',
  transactionStatus: TransactionStatus.paid,
  network: Network.bsc,
  options: {},
  abi: '',
  lockup: 3,
  price: 5,
  contractName: 'asdasd',
  quorum: 1,
  partners: [],
  shares: [],
} as any;

const thirdContract: CombinedContract = {
  testnet: false,
  address: 'nbvnvbmvbm6546',
  createdAt: new Date(1),
  decimals: 0.6,
  testnetAddress: 'xzczxczxcczxczxc24321345443543534',
  _id: 1,
  userId: 2,
  symbol: 'ttt',
  verified: true,
  sourceCode: 'dasd12321',
  status: ContractStatus.waitingForDeployment,
  type: ContractType.erc20DefContract,
  initialOwner: 'dcxzczxczx324532355534',
  totalSupply: '2',
  maxPerWallet: 3,
  name: 'yruytut-utyu657657',
  transactionStatus: TransactionStatus.waitingForPayment,
  network: Network.bsc,
  options: {},
  abi: '',
  lockup: 3,
  price: 5,
  contractName: 'asdasd',
  quorum: 1,
  partners: [],
  shares: [],
} as any;

describe('filterContracts', () => {
  it('should return filtered by name contracts', () => {
    const result = filterContracts(
      {
        search: 'yu65765',
        network: Network.bsc,
        status: '',
        type: ContractType.erc20DefContract,
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([thirdContract]);
  });

  it('should return filtered by address', () => {
    const result = filterContracts(
      {
        search: 'vbmvbm65',
        network: Network.bsc,
        status: '',
        type: ContractType.erc20DefContract,
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([thirdContract]);
  });

  it('should return filtered by symbol', () => {
    const result = filterContracts(
      {
        search: 'btc',
        network: Network.bsc,
        status: '',
        type: ContractType.erc20DefContract,
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([firstContract]);
  });

  it('should return filtered by initial owner', () => {
    const result = filterContracts(
      {
        search: 'zczxczx5',
        network: Network.bsc,
        status: '',
        type: ContractType.erc20DefContract,
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([firstContract, secondContract]);
  });

  it('should return filtered by type daoContract', () => {
    const result = filterContracts(
      {
        search: 'zczxczx5',
        network: Network.bsc,
        status: '',
        type: ContractType.daoContract,
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([]);
  });

  it('should return filtered by type erc20DefContract', () => {
    const result = filterContracts(
      {
        search: 'zczxczx5',
        network: Network.aurora,
        status: '',
        type: ContractType.erc20DefContract,
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([]);
  });

  it('should return filtered by status deployed', () => {
    const result = filterContracts(
      {
        search: '',
        network: '',
        status: ContractStatus.deployed,
        type: '',
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([firstContract]);
  });

  it('should return filtered by status waitingForDeployment', () => {
    const result = filterContracts(
      {
        search: '',
        network: '',
        status: ContractStatus.waitingForDeployment,
        type: '',
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([secondContract, thirdContract]);
  });

  it('should return filtered by status waitingForPayment', () => {
    const result = filterContracts(
      {
        search: '',
        network: '',
        status: TransactionStatus.waitingForPayment,
        type: '',
        isLoading: false,
      },
      [firstContract, secondContract, thirdContract]
    );

    expect(result).toEqual([thirdContract]);
  });
});
