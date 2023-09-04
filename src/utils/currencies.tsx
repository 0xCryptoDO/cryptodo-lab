import { Currencies } from '@cryptodo/contracts';

import {
  BinanceCoinLogoIcon,
  BinanceUsdLogoIcon,
  TetherLogoIcon,
  CryptoDoLogoIcon,
  EthereumCoinIcon,
  MaticCoinIcon,
  AvaxCoinIcon,
  MantleLogoIcon,
  OktCoinIcon,
  BitgertLogoIcon,
  FiveIreLogoIcon,
  ShardeumLogoIcon,
  BitTorrentLogoIcon,
  GateLogoIcon,
  EvmOsLogoIcon,
  FantomLogoIcon,
  ZetaLogoIcon,
  CronosLogoIcon,
  NautilusLogoIcon,
  EosEvmLogoIcon,
  ArtheraLogoIcon,
} from '@/assets/icons';
import { CurrencyMeta } from '@/types';

export const currenciesMeta: Record<Currencies, CurrencyMeta> = {
  [Currencies.usd]: {
    name: 'Tether',
    symbol: Currencies.usd,
    logo: <TetherLogoIcon />,
    disabled: true,
  },
  [Currencies.busd]: {
    name: 'Binance USD',
    symbol: Currencies.busd,
    logo: <BinanceUsdLogoIcon />,
  },
  [Currencies.bnb]: {
    name: 'Binance Coin',
    symbol: Currencies.bnb,
    logo: <BinanceCoinLogoIcon />,
  },
  [Currencies.cdo]: {
    name: 'CryptoDo',
    symbol: Currencies.cdo,
    logo: <CryptoDoLogoIcon />,
  },
  [Currencies.eth]: {
    name: 'Ethereum',
    symbol: Currencies.eth,
    logo: <EthereumCoinIcon />,
  },
  [Currencies.matic]: {
    name: 'Matic',
    symbol: Currencies.matic,
    logo: <MaticCoinIcon />,
  },
  [Currencies.avax]: {
    name: 'Avax',
    symbol: Currencies.avax,
    logo: <AvaxCoinIcon />,
  },
  [Currencies.mnt]: {
    name: 'Mantle',
    symbol: Currencies.mnt,
    logo: <MantleLogoIcon />,
  },
  [Currencies.okt]: {
    name: 'Okt',
    symbol: Currencies.okt,
    logo: <OktCoinIcon />,
  },
  [Currencies.brise]: {
    name: 'Brise',
    symbol: Currencies.brise,
    logo: <BitgertLogoIcon />,
  },
  [Currencies.fiveIre]: {
    name: '5ire',
    symbol: Currencies.fiveIre,
    logo: <FiveIreLogoIcon />,
  },
  [Currencies.shm]: {
    name: 'shardeum',
    symbol: Currencies.shm,
    logo: <ShardeumLogoIcon />,
  },
  [Currencies.btt]: {
    name: 'bitTorrent',
    symbol: Currencies.btt,
    logo: <BitTorrentLogoIcon />,
  },
  [Currencies.gt]: {
    name: 'GT',
    symbol: Currencies.gt,
    logo: <GateLogoIcon />,
  },
  [Currencies.evmOs]: {
    name: 'Evmos',
    symbol: Currencies.evmOs,
    logo: <EvmOsLogoIcon />,
  },
  [Currencies.ftm]: {
    name: 'Fantom',
    symbol: Currencies.ftm,
    logo: <FantomLogoIcon />,
  },
  [Currencies.cro]: {
    name: 'Cronos',
    symbol: Currencies.cro,
    logo: <CronosLogoIcon />,
  },
  [Currencies.zeta]: {
    name: 'Zeta',
    symbol: Currencies.zeta,
    logo: <ZetaLogoIcon />,
  },
  [Currencies.zbc]: {
    name: 'Zbc',
    symbol: Currencies.zbc,
    logo: <NautilusLogoIcon />,
  },
  [Currencies.eos]: {
    name: 'Eos',
    symbol: Currencies.eos,
    logo: <EosEvmLogoIcon />,
  },
  [Currencies.aa]: {
    name: 'Arthera',
    symbol: Currencies.aa,
    logo: <ArtheraLogoIcon />,
  },
};
