import { ContractStatus, IContractBase, Network } from '@cryptodo/contracts';
import sdk from '@cryptodo/frontend-sdk';

import { getContractScanLink } from '@/utils';
import {
  AuroraLogoIcon,
  BitgertLogoIcon,
  BscScanLogoIcon,
  EtherscanLogoIcon,
  FiveIreLogoIcon,
  PolygonscanLogoIcon,
} from '@/assets/icons';

beforeEach(() => {
  jest.spyOn(sdk, 'getExprorerUrl').mockReturnValue('url');
});

describe('getContractScanLink', () => {
  const baseContract: IContractBase = {
    testnet: true,
    network: Network.bsc,
    testnetAddress: 'dasdasdaszxc',
    address: 'dasvfcsxvxcv',
    _id: 2,
    createdAt: new Date(1),
    name: 'dasxczczxc',
    status: ContractStatus.deployed,
    userId: 1,
    abi: 'abi',
  };

  describe('BSC', () => {
    it('should return correct label and link for testnet', () => {
      const contract: IContractBase = baseContract;

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <BscScanLogoIcon />,
        label: 'BSC Scan',
        link: `${'url'}/address/${contract.testnetAddress}`,
      });
    });

    it('should return correct label and link for mainnet', () => {
      const contract: IContractBase = { ...baseContract, testnet: false };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <BscScanLogoIcon />,
        label: 'BSC Scan',
        link: `${'url'}/address/${contract.address}`,
      });
    });
  });

  describe('ETH', () => {
    it('should return correct label and link for testnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        network: Network.ethereum,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <EtherscanLogoIcon />,
        label: 'ETHEREUM Scan',
        link: `${'url'}/address/${contract.testnetAddress}`,
      });
    });

    it('should return correct label and link for mainnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        testnet: false,
        network: Network.ethereum,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <EtherscanLogoIcon />,
        label: 'ETHEREUM Scan',
        link: `${'url'}/address/${contract.address}`,
      });
    });
  });

  describe('Polygon', () => {
    it('should return correct label and link for testnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        network: Network.polygon,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <PolygonscanLogoIcon />,
        label: 'POLYGON Scan',
        link: `${'url'}/address/${contract.testnetAddress}`,
      });
    });

    it('should return correct label and link for mainnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        testnet: false,
        network: Network.polygon,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <PolygonscanLogoIcon />,
        label: 'POLYGON Scan',
        link: `${'url'}/address/${contract.address}`,
      });
    });
  });

  describe('Aurora', () => {
    it('should return correct label and link for testnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        network: Network.aurora,
        testnet: true,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <AuroraLogoIcon />,
        label: 'AURORA Scan',
        link: `url/address/${contract.testnetAddress}`,
      });
    });

    it('should return correct label and link for mainnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        testnet: false,
        network: Network.aurora,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <AuroraLogoIcon />,
        label: 'AURORA Scan',
        link: `url/address/${contract.address}`,
      });
    });
  });

  describe('Bitgert', () => {
    it('should return correct label and link for testnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        network: Network.bitgert,
        testnet: true,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <BitgertLogoIcon />,
        label: 'BITGERT Scan',
        link: `url/address/${contract.testnetAddress}`,
      });
    });

    it('should return correct label and link for mainnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        testnet: false,
        network: Network.bitgert,
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <BitgertLogoIcon />,
        label: 'BITGERT Scan',
        link: `url/address/${contract.address}`,
      });
    });
  });

  describe('5ire', () => {
    it('should return correct label and link for testnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        network: Network.fiveIre,
        testnet: true,
        txHash: 'hash',
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <FiveIreLogoIcon />,
        label: '5ire Scan',
        link: `https://explorer.5ire.network/evm/tx/hash`,
      });
    });

    it('should return correct label and link for mainnet', () => {
      const contract: IContractBase = {
        ...baseContract,
        testnet: false,
        network: Network.fiveIre,
        txHash: 'hash',
      };

      const result = getContractScanLink(contract);

      expect(result).toEqual({
        icon: <FiveIreLogoIcon />,
        label: '5ire Scan',
        link: `https://explorer.5ire.network/evm/tx/hash`,
      });
    });
  });
});
