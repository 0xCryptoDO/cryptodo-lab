import { FC, useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { toast } from 'react-toastify';
import { providers } from 'ethers';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import {
  ContractType,
  Currencies,
  faucetAmountToSend,
  Network,
  networkCurrencies,
  NETWORKS_WITH_DISABLED_PAYMENTS,
  rpcUrls,
  TESTNET_ONLY_NETWORKS,
} from '@cryptodo/contracts';
import { switchToRightNetwork, useEthers } from '@cryptodo/frontend-sdk';

import { useContractCost, useFaucet } from '@/hooks';
import { Button, Divider, Loader, Text, Tooltip } from '@/components';

import { useTypedSelector } from '@/reduxStore';
import { networksMeta } from '@/utils/networks';

import * as S from './createTokenPricing.style';
import { CreateTokenPricingProps } from './createTokenPricing.types';

const CONTRACT_TYPES_REQUIRE_SWITCH_NETWORK = [ContractType.icoContract];

export const CreateTokenPricing: FC<CreateTokenPricingProps> = (props) => {
  const { handleSubmit, type, options } = props;

  const { t } = useTranslation('CreateToken');
  const { account } = useEthers();

  const selectedBlockchain = useTypedSelector(
    (state) => state.contracts.createToken.network
  );
  const token = useTypedSelector((state) => state.auth.token);

  const [isRequestFundLoading, setRequestFundsLoading] = useState(false);

  const { isAvailable, nextAvailableDate, requestFunds } = useFaucet({
    network: selectedBlockchain,
    address: account || '',
    isRequestFundLoading,
  });

  const [isFaucetAvailable, setIsFaucetAvailable] = useState(true);
  const [txUrl, setTxUrl] = useState('');
  const requestFundsButtonClick = async () => {
    try {
      setRequestFundsLoading(true);
      const requestFundsResponse = await requestFunds({
        network: selectedBlockchain,
        address: account || '',
      });
      if (selectedBlockchain === Network.bitgert) {
        setTxUrl(requestFundsResponse.txInExplorerUrl);
      } else {
        const provider = new providers.JsonRpcProvider(
          rpcUrls[selectedBlockchain].testnet
        );
        if (requestFundsResponse?.txInExplorerUrl) {
          setTxUrl(requestFundsResponse.txInExplorerUrl);
          const transaction = await provider.getTransaction(
            requestFundsResponse.txHash
          );
          const transactionResponse = await transaction.wait();
          if (transactionResponse.status === 1) {
            const message = t('fundsRequestSucceed');
            toast.success(message);
          } else {
            const message = t('fundsError');
            toast.warning(message);
          }
        }
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      if (selectedBlockchain !== Network.bitgert) {
        setTxUrl('');
      }
      setRequestFundsLoading(false);
    }
  };

  const faucetMessage = useMemo(() => {
    if (txUrl) {
      if (selectedBlockchain === Network.bitgert) {
        setIsFaucetAvailable(false);
        return 'txUrlBitgert';
      }
      return 'txUrl';
    }
    const nextDate = new Date();
    nextDate.setSeconds(nextDate.getSeconds() + 10);
    if (
      nextAvailableDate &&
      new Date(nextAvailableDate).getTime() / 1000 > nextDate.getTime() / 1000
    ) {
      setIsFaucetAvailable(false);
      return 'unavailableFaucetForUser';
    }
    if (isAvailable) {
      setIsFaucetAvailable(true);
      return 'requestFunds';
    }
    setIsFaucetAvailable(false);
    return 'unavailableFaucet';
  }, [isAvailable, nextAvailableDate, txUrl]);

  const { locale } = useRouter();

  const { switchNetwork } = useEthers();

  const formattedNextAvailableDate = useMemo(
    () =>
      nextAvailableDate &&
      format(new Date(nextAvailableDate), 'd LLLL Y, HH:mm', {
        locale: locale === 'ru' ? ru : enUS,
      }),
    [nextAvailableDate, locale]
  );

  const contractCost = useContractCost({
    currency: Currencies.usd,
    token,
    type,
    options,
  });

  const BlockButton = (
    <S.BlockButton>
      <Button
        disabled={TESTNET_ONLY_NETWORKS.includes(selectedBlockchain)}
        stretch
        onClick={async () => {
          if (CONTRACT_TYPES_REQUIRE_SWITCH_NETWORK.includes(type)) {
            await switchToRightNetwork({
              net: 'mainnet',
              selectedNetwork: selectedBlockchain,
              switchNetwork,
            });
          }
          handleSubmit(false);
        }}
      >
        {t(
          TESTNET_ONLY_NETWORKS.includes(selectedBlockchain)
            ? 'postToMainnetSoon'
            : 'postToMainnet'
        )}
      </Button>
    </S.BlockButton>
  );

  return (
    <S.Pricing>
      <S.Block>
        <S.BlockTitle>
          <S.Title>{t('faucet')}</S.Title>
        </S.BlockTitle>
        <Divider />
        <S.BlockPrices>
          <S.PriceItem isTotal style={{ justifyContent: 'flex-start' }}>
            {txUrl && selectedBlockchain !== Network.bitgert ? (
              <Loader width={18} height={18} style={{ marginRight: 4 }} />
            ) : null}
            <Text type="secondary">
              {t(faucetMessage, {
                value: faucetAmountToSend[selectedBlockchain],
                currency: Object.keys(networkCurrencies[selectedBlockchain])[0],
                date: formattedNextAvailableDate,
              })}
              {txUrl ? (
                <S.Link target="_blank" rel="noreferrer" href={txUrl}>
                  {t('txUrlLink')}
                </S.Link>
              ) : null}
            </Text>
          </S.PriceItem>
        </S.BlockPrices>
        <Divider />

        <S.BlockButton>
          <Button
            isLoading={isRequestFundLoading && !txUrl}
            disabled={!isFaucetAvailable || isRequestFundLoading}
            stretch
            onClick={requestFundsButtonClick}
            css={{ whiteSpace: 'normal' }}
          >
            {t('sendMeFunds')}
          </Button>
        </S.BlockButton>
      </S.Block>

      <S.Block>
        <S.BlockTitle>
          <S.Title>{t('common:networks.testnet')}</S.Title>
        </S.BlockTitle>
        <Divider />
        <S.BlockPrices>
          <S.PriceItem isTotal>
            <Text type="secondary">{t('total')}</Text>
            <Text>{t('free')}</Text>
          </S.PriceItem>
        </S.BlockPrices>
        <Divider />
        <S.BlockButton>
          <Button
            theme="secondary"
            stretch
            disabled={isRequestFundLoading}
            onClick={async () => {
              if (CONTRACT_TYPES_REQUIRE_SWITCH_NETWORK.includes(type)) {
                await switchToRightNetwork({
                  net: 'testnet',
                  selectedNetwork: selectedBlockchain,
                  switchNetwork,
                });
              }
              handleSubmit(true);
            }}
          >
            {t('postToTestnet')}
          </Button>
        </S.BlockButton>
      </S.Block>

      <S.Block>
        <S.BlockTitle>
          <S.Title>{t('common:networks.mainnet')}</S.Title>
        </S.BlockTitle>
        <Divider />
        <S.BlockPrices>
          <S.PriceItem isTotal>
            <Text type="secondary">{t('total')}</Text>
            <Text>
              {NETWORKS_WITH_DISABLED_PAYMENTS.includes(selectedBlockchain)
                ? t('free')
                : contractCost.el}
            </Text>
          </S.PriceItem>
        </S.BlockPrices>
        <Divider />
        {TESTNET_ONLY_NETWORKS.includes(selectedBlockchain) ? (
          <Tooltip
            content={t('common:networks.unsupportedMainnet', {
              network: networksMeta[selectedBlockchain].name,
            })}
          >
            {BlockButton}
          </Tooltip>
        ) : (
          BlockButton
        )}
      </S.Block>
    </S.Pricing>
  );
};
