import { FC, MouseEvent, useMemo, useRef } from 'react';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import useTranslation from 'next-translate/useTranslation';
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
  TokenName,
} from '@/components';
import { CopyButton } from '@/components/atoms/CopyButton/copyButton.style';
import { CopyField } from '@/components/molecules/CopyField/copyField.style';
import { getContractScanLink } from '@/utils';
import { SmartContractCardProps } from '@/views/SmartContracts/components/SmartContractCard/smartContract.card.types';
import { useTypedDispatch } from '@/reduxStore';
import { setContractNetwork } from '@/reduxStore/slices/contracts/contracts.slice';

import * as S from './smartContract.card.mobile.style';

export const SmartContractCardMobile: FC<SmartContractCardProps> = (props) => {
  const { contract, pay, deploy } = props;
  const {
    name,
    symbol,
    address: mainAddress,
    testnetAddress,
    testnet,
    createdAt,
    transactionStatus,
    status,
    network,
    _id,
  } = contract;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('SmartContracts');
  const { locale, push } = useRouter();
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  
  const formattedCreatedAt = useMemo(
    () =>
      format(new Date(createdAt), 'd LLLL Y', {
        locale: locale === 'ru' ? ru : enUS,
      }),
    [createdAt, locale]
  );
  const address = testnet ? testnetAddress : mainAddress;
  const href = `/contract/${network}/${address}`;
  const txPaid = transactionStatus === TransactionStatus.paid;
  const contractDeployed = status === ContractStatus.deployed && address;

  const { link, icon } = getContractScanLink(contract);

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
      ref={cardRef}
      onClick={handleClickCard}
    >
      <S.Header>
        <TokenName name={name} symbol={symbol} />
        <S.HeaderStatuses>
          <Badge color={testnet ? 'purple' : 'green'}>
            {t(`common:networks.${testnet ? 'testnet' : 'mainnet'}`)}
          </Badge>
          <Badge color={contractDeployed ? 'green' : 'yellow'}>
            {t(`common:statuses.${getStatus()}`)}
          </Badge>
        </S.HeaderStatuses>
        <S.CreatedText>
          <S.Text secondary>{t('common:created')}: </S.Text>
          <p>{formattedCreatedAt}</p>
        </S.CreatedText>
      </S.Header>
      <S.CardFooter direction="vertical" size="large">
        <ContractMeta asChild contract={contract} />
      </S.CardFooter>
      <S.CardActions post isFooter ref={actionsRef}>
        {getStatus() === 'waitingForPayment' && (
          <Button size="small" onClick={() => (pay ? pay(_id) : null)}>
            {t('common:pay')}
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
            {t('common:deploy')}
          </Button>
        )}
        {testnet &&
          contractDeployed &&
          !TESTNET_ONLY_NETWORKS.includes(network) && (
            <Button size="small" onClick={() => (pay ? pay(_id) : null)}>
              {t('SmartContracts:post')}
            </Button>
          )}
        {address && <ScanButton theme="secondary" link={link} icon={icon} />}
      </S.CardActions>
    </S.Card>
  );
};
