import { ReactNode } from 'react';

import { explorerUrls, IContractBase, Net, Network } from '@cryptodo/contracts';
import { getExprorerUrl } from '@cryptodo/frontend-sdk';

import {
  AuroraLogoIcon,
  AvalancheLogoIcon,
  BitgertLogoIcon,
  BitTorrentLogoIcon,
  BscScanLogoIcon,
  EtherscanLogoIcon,
  EvmOsLogoIcon,
  FantomLogoIcon,
  FiveIreLogoIcon,
  GateLogoIcon,
  LightlinkLogoIcon,
  MantleLogoIcon,
  OKCLogoIcon,
  OptimismLogoIcon,
  PolygonscanLogoIcon,
  ShardeumLogoIcon,
  ZetaLogoIcon,
  CronosLogoIcon,
  ArbitrumLogoIcon,
  NautilusLogoIcon,
  EosEvmLogoIcon,
  BaseLogoIcon,
  ArtheraLogoIcon,
} from '@/assets/icons';

const BRAND_ASSETS: Record<Network, ReactNode> = {
  [ Network.bsc ]: <BscScanLogoIcon />,
  [ Network.ethereum ]: <EtherscanLogoIcon />,
  [ Network.polygon ]: <PolygonscanLogoIcon />,
  [ Network.optimism ]: <OptimismLogoIcon />,
  [ Network.aurora ]: <AuroraLogoIcon />,
  [ Network.avalanche ]: <AvalancheLogoIcon />,
  [ Network.mantle ]: <MantleLogoIcon />,
  [ Network.okc ]: <OKCLogoIcon />,
  [ Network.bitgert ]: <BitgertLogoIcon />,
  [ Network.fiveIre ]: <FiveIreLogoIcon />,
  [ Network.shardeum ]: <ShardeumLogoIcon />,
  [ Network.bitTorrent ]: <BitTorrentLogoIcon />,
  [ Network.gate ]: <GateLogoIcon />,
  [ Network.evmOs ]: <EvmOsLogoIcon />,
  [ Network.lightlink ]: <LightlinkLogoIcon />,
  [ Network.zetaChain ]: <ZetaLogoIcon />,
  [ Network.fantom ]: <FantomLogoIcon />,
  [ Network.cronos ]: <CronosLogoIcon />,
  [ Network.arbitrum ]: <ArbitrumLogoIcon />,
  [ Network.nautilus ]: <NautilusLogoIcon />,
  [ Network.eosEvm ]: <EosEvmLogoIcon />,
  [ Network.opBnb ]: <BscScanLogoIcon />,
  [ Network.base ]: <BaseLogoIcon />,
  [ Network.greenfieldBnb ]: <BscScanLogoIcon />,
  [ Network.arthera ]: <ArtheraLogoIcon />,
};

export const getContractScanLink = (contract: IContractBase) => {
  const { testnet, network, testnetAddress, address } = contract;
  const linkWithoutScan = `/address/${testnet ? testnetAddress : address}`;
  const label = `${network} Scan`;
  let link;
  try {
    link = `${getExprorerUrl(network, testnet)}${linkWithoutScan}`;
  } catch (_err) {
    link = '';
  }
  // default AURORA link not working
  if (link.includes('testnet.aurorascan.dev')) {
    link = `https://explorer.testnet.aurora.dev${linkWithoutScan}`;
  }
  // 5ire does not support displaying contract
  if (contract.network === Network.fiveIre) {
    const net: Net = contract.testnet ? 'testnet' : 'mainnet';
    const explorerUrl = explorerUrls[Network.fiveIre][net];
    link = `${explorerUrl}/evm/tx/${contract.txHash}`;
  }
  const icon = BRAND_ASSETS[network];

  return {
    label,
    link,
    icon,
  };
};
