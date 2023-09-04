import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import {
  ContractType,
  Currencies,
  DISABLED_NETWORKS_IN_CONTRACTS,
  Network,
  networkCurrencies,
} from '@cryptodo/contracts';

import { Button, Select, Space, Text, TokenCard } from '@/components';
import { DialogBeta } from '@/components/atoms/DialogBeta/dialogBeta.component';
// import { HecoLogoIcon } from '@/assets/icons';
import { academyLinks } from '@/utils/constants';
import { NetworkMeta } from '@/types/blockchains';
import { networksMeta } from '@/utils/networks';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleCreateTokenDialog } from '@/reduxStore/slices/ui/ui.slice';
import {
  setContractNetwork,
  setContractType,
  setPaymentCurrency,
  setPaymentNetwork,
} from '@/reduxStore/slices/contracts/contracts.slice';

import * as S from './createToken.dialog.style';

export const CreateTokenDialog: FC = () => {
  const createTokenDialogOpen = useTypedSelector(
    (state) => state.ui.createTokenDialogOpen
  );
  const selectedBlockchain = useTypedSelector(
    (state) => state.contracts.createToken.network
  );
  const selectedContractType = useTypedSelector(
    (state) => state.contracts.createToken.contractType
  );

  const dispatch = useTypedDispatch();
  const { push, isReady, query, pathname } = useRouter();
  const { t } = useTranslation('SmartContracts');

  const toggleBlockchain = async (network: string) => {
    if (query.type) {
      await push({
        query: { type: query?.type, network },
      });
    } else {
      await push({
        query: { ...query, network },
      });
    }
  };

  const [currentBlockchain, setCurrentBlockchain] = useState<Network>(
    (query?.network as Network) || selectedBlockchain
  );

  const handleToggleDialog = (open: boolean) => {
    if (open) {
      dispatch(toggleCreateTokenDialog(true));
      return;
    }
    const network =
      (query?.network as Network) || currentBlockchain || Network.bsc;

    setCurrentBlockchain(network);
    if (!networksMeta[network].paymentsDisabled) {
      dispatch(setPaymentNetwork(network));
      dispatch(
        setPaymentCurrency(
          Object.keys(networkCurrencies[network])[0] as Currencies
        )
      );
    }
    dispatch(toggleCreateTokenDialog(false));
  };

  useEffect(() => {
    if (isReady && query?.network) {
      const network = query?.network as Network;
      setCurrentBlockchain(network);
      if (!networksMeta[network].paymentsDisabled) {
        dispatch(setPaymentNetwork(network));
        dispatch(
          setPaymentCurrency(
            Object.keys(networkCurrencies[network])[0] as Currencies
          )
        );
      }
    }
  }, [isReady, query?.network]);

  const contractTypes: { label: string; value: ContractType }[] = Object.values(
    ContractType
  ).map((type) => ({
    label: t(`common:contractTypes.${type}`),
    value: type,
  }));

  const comingSoonTypes: { label: string; value: string; disabled: boolean }[] =
    [
      {
        label: 'Farming (coming soon)',
        value: 'farming',
        disabled: true,
      },
    ];

  const combinedContractTypes = [...contractTypes, ...comingSoonTypes];

  useEffect(() => {
    if (!query?.network && isReady && pathname.includes('create')) {
      toggleBlockchain(Network.bsc);
    }
  }, [isReady]);

  return (
    <DialogBeta
      open={createTokenDialogOpen}
      onOpenChange={handleToggleDialog}
      title={t('create.title')}
      closeIcon
      action={
        <Button
          stretch
          onClick={() => {
            dispatch(setContractNetwork(currentBlockchain));
            push({
              pathname: '/create',
              query: {
                type: selectedContractType,
                network: currentBlockchain,
              },
            });
            dispatch(toggleCreateTokenDialog(false));
          }}
        >
          {t('create.submit')}
        </Button>
      }
    >
      <Space size="middle" direction="vertical" css={{ marginBottom: '1rem' }}>
        <div>
          <S.BlockchainsWrapper size="small" direction="vertical">
            <Text size="small">
              {t('create.blockchain')}
              <Text type="danger" size="small">
                *
              </Text>
            </Text>
            <S.BlockchainsList>
              { Object.keys(networksMeta)
                .filter(n => {
                  const network = n as Network;
                  const item: NetworkMeta = networksMeta[ network ] as NetworkMeta;
                  return item.symbol === 'BNB'; // Filter only networks with symbol 'BNB'
                })
                .map(n => {
                  const network = n as Network;
                  const item: NetworkMeta = networksMeta[ network ] as NetworkMeta;
                  return (
                    <TokenCard
                      key={ `${ item.symbol }-${ item.name }` }
                      isActive={ currentBlockchain === network }
                      disabled={
                        item.disabled ||
                        (DISABLED_NETWORKS_IN_CONTRACTS.MULTISIG_CONTRACT?.includes(
                          network
                        ) &&
                          selectedContractType === ContractType.multisigContract)
                      }
                      onClick={ () => {
                        setCurrentBlockchain(network);
                      } }
                      logo={ item.logo }
                      name={
                        item.disabled
                          ? `${ item.name } (${ t('create.soon') })`
                          : item.name
                      }
                    />
                  );
                }) }
              {/* <TokenCard
                name={`Klaytn (${t('create.soon')})`}
                logo={<KlaytnLogoIcon />} 
                disabled
              /> */}
              {/* <TokenCard
                name={`Heco (${t('create.soon')})`}
                logo={<HecoLogoIcon />}
                disabled
              /> */}
            </S.BlockchainsList>
          </S.BlockchainsWrapper>
        </div>
        <div>
          <Space size="middle" direction="vertical">
            <Space direction="vertical">
              <Text size="small">
                {t('create.type')}
                <Text type="danger" size="small">
                  *
                </Text>
              </Text>
              <Select
                onChange={(value) => {
                  if (
                    !comingSoonTypes.find(
                      (comingSoonType) => comingSoonType.value === value
                    )
                  ) {
                    dispatch(setContractType(value as ContractType));
                  }
                }}
                value={selectedContractType}
                defaultValue="smart"
                items={combinedContractTypes}
              />
            </Space>
            <S.BlockchainsInfo>
              {t(`typeDescriptions.${selectedContractType}`)}{' '}
              <a
                href={academyLinks[selectedContractType]}
                target="_blank"
                rel="noreferrer"
              >
                {t('moreInfo')}
              </a>
            </S.BlockchainsInfo>
          </Space>
        </div>
      </Space>
    </DialogBeta>
  );
};
