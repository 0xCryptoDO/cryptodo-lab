import { FC, MouseEvent, useMemo, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useRouter } from 'next/router';

import {
  ContractStatus,
  TESTNET_ONLY_NETWORKS,
  TransactionStatus,
} from '@cryptodo/contracts';

import {
  Badge,
  Button,
  ContractMeta,
  ScanButton,
  Space,
  TokenName,
} from '@/components';
import { SmartContractCardProps } from '@/views/SmartContracts/components/SmartContractCard/smartContract.card.types';
import { getContractScanLink } from '@/utils';
import { CopyField } from '@/components/molecules/CopyField/copyField.style';
import { CopyButton } from '@/components/atoms/CopyButton/copyButton.style';
import { useTypedDispatch } from '@/reduxStore';
import { setContractNetwork } from '@/reduxStore/slices/contracts/contracts.slice';

import * as S from './smartContract.card.desktop.style';

export const SmartContractCardDesktop: FC<SmartContractCardProps> = (props) => {
  const { contract, pay, deploy } = props;
  const {
    address: mainAddress,
    _id,
    testnetAddress,
    name,
    symbol,
    createdAt,
    testnet,
    status,
    transactionStatus,
    network,
  } = contract;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');
  const { locale, push } = useRouter();
  const formattedCreatedAt = useMemo(
    () =>
      format(new Date(createdAt), 'd LLLL Y', {
        locale: locale === 'ru' ? ru : enUS,
      }),
    [createdAt, locale]
  );

  const actionsRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const address = testnet ? testnetAddress : mainAddress;
  const href = `/contract/${network}/${address}`;
  const txPaid = transactionStatus === TransactionStatus.paid;
  const contractDeployed = status === ContractStatus.deployed && address;

  const scanMeta = getContractScanLink(contract);

  const handleClickCard = (event: MouseEvent) => {
    if (!address) {
      return;
    }

    const target = event.target as Node;
    const copyField = cardRef.current?.querySelector(`.${CopyField.className}`);
    const copyButtons = cardRef.current?.querySelectorAll(
      `.${CopyButton.className}`
    );
    let isCopyPressed = false;

    copyButtons?.forEach((button) => {
      if (button.contains(target)) {
        isCopyPressed = true;
      }
    });

    if (
      actionsRef.current &&
      !actionsRef.current?.contains(target) &&
      !copyField?.contains(target) &&
      !isCopyPressed
    ) {
      push(href);
    }
  };

  const isMainnetUnpaid = !testnet && !txPaid;
  const getStatus = () => {
    if (contractDeployed) {
      return 'deployed';
    }
    if (isMainnetUnpaid) {
      return 'waitingForPayment';
    }
    return 'waitingForDeploy';
  };

  return (
    <S.Card
      style={{ cursor: !address ? 'default' : 'pointer' }}
      onClick={handleClickCard}
      ref={cardRef}
    >
      <S.Header>
        <Space direction="vertical">
          <S.HeaderInfo>
            <Space align="center">
              <TokenName name={name} symbol={symbol} />
              <S.HeaderStatuses>
                <Badge color={testnet ? 'purple' : 'green'}>
                  {t(`networks.${testnet ? 'testnet' : 'mainnet'}`)}
                </Badge>
                <Badge color={contractDeployed ? 'green' : 'yellow'}>
                  {t(`statuses.${getStatus()}`)}
                </Badge>
              </S.HeaderStatuses>
            </Space>
            <S.CardActionsWrapper ref={actionsRef}>
              <S.CardActions post={testnet}>
                {getStatus() === 'waitingForPayment' && (
                  <Button size="small" onClick={() => (pay ? pay(_id) : null)}>
                    {t('pay')}
                  </Button>
                )}
                {getStatus() === 'waitingForDeploy' && (
                  <Button
                    size="small"
                    onClick={() => {
                      if (deploy) {
                        dispatch(setContractNetwork(network));
                        deploy(_id, testnet);
                      }
                    }}
                  >
                    {t('deploy')}
                  </Button>
                )}
                {testnet &&
                  contractDeployed &&
                  !TESTNET_ONLY_NETWORKS.includes(network) && (
                    <Button
                      size="small"
                      onClick={() => (pay ? pay(_id) : null)}
                    >
                      {t('SmartContracts:post')}
                    </Button>
                  )}
                {status === ContractStatus.deployed && (
                  <ScanButton
                    theme="secondary"
                    icon={scanMeta.icon}
                    link={scanMeta.link}
                  />
                )}
              </S.CardActions>
            </S.CardActionsWrapper>
          </S.HeaderInfo>
          <S.CreatedText>
            <S.Text secondary>{t('created')}: </S.Text>
            {formattedCreatedAt}
          </S.CreatedText>
        </Space>
      </S.Header>
      <S.CardFooter direction="vertical" size="large">
        <ContractMeta asChild contract={contract} />
      </S.CardFooter>
    </S.Card>
  );
};
