import useTranslation from 'next-translate/useTranslation';

import { shortenIfAddress } from '@cryptodo/frontend-sdk';
import {
  ContractType,
  IERC20Contract,
  IICOContract,
  IStakingContract,
  Network,
} from '@cryptodo/contracts';

import { CopyButton, CopyField, Space, Text } from '@/components';
import { networkTranslation } from '@/utils/constants';

import { ContractMetaProps } from './contractMeta.types';

import * as S from './contractMeta.style';

export const ContractMeta = (props: ContractMetaProps) => {
  const { contract, asChild } = props;
  const {
    network,
    decimals,
    address: mainAddress,
    testnet,
    testnetAddress,
    type,
  } = contract;

  const { t } = useTranslation('common');
  const address = testnet ? testnetAddress : mainAddress;
  return (
    <S.Wrapper asChild={asChild}>
      <S.Info align="center">
        <S.InfoItem direction="vertical">
          <Text type="secondary">{t('network')}:</Text>
          <Text>{networkTranslation[network as Network]}</Text>
        </S.InfoItem>
        <S.InfoItem direction="vertical">
          <Text type="secondary">{t('type')}:</Text>
          <Text>{t(`common:contractTypes.${type}`)}</Text>
        </S.InfoItem>
        {(contract as IERC20Contract).initialOwner && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('owner')}:</Text>
            <Text>
              <Space size="small">
                {shortenIfAddress((contract as IERC20Contract).initialOwner)}
                <CopyButton
                  content={(contract as IERC20Contract).initialOwner}
                />
              </Space>
            </Text>
          </S.InfoItem>
        )}
        {(contract as IERC20Contract).totalSupply && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('totalSupply')}:</Text>
            <Text>{(contract as IERC20Contract).totalSupply}</Text>
          </S.InfoItem>
        )}
        {(contract as IICOContract).lockup && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('lockup')}:</Text>
            <Text>{(contract as IICOContract).lockup / 24 / 60 / 60}</Text>
          </S.InfoItem>
        )}
        {(contract as IStakingContract).minStake && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('minStake')}:</Text>
            <Text>{(contract as IStakingContract).minStake}</Text>
          </S.InfoItem>
        )}
        {(contract as IStakingContract).maxStake && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('maxStake')}:</Text>
            <Text>{(contract as IStakingContract).maxStake}</Text>
          </S.InfoItem>
        )}
        {(contract as IStakingContract).rewardRates && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('reward')}:</Text>
            <Text>
              {(contract as IStakingContract).rewardRates.length === 1
                ? `${(contract as IStakingContract).rewardRates[0]}%`
                : `${t('upTo')} ${Math.max(
                    ...(contract as IStakingContract).rewardRates
                  )}%`}
            </Text>
          </S.InfoItem>
        )}
        {decimals && (
          <S.InfoItem direction="vertical">
            <Text type="secondary">{t('decimals')}:</Text>
            <Text>{decimals}</Text>
          </S.InfoItem>
        )}
        {type === ContractType.icoContract &&
          (contract as IICOContract).receiverAddress && (
            <S.InfoItem direction="vertical">
              <Text type="secondary">{t('receiverAddress')}:</Text>
              <Text>
                <Space size="small">
                  {shortenIfAddress((contract as IICOContract).receiverAddress)}
                  <CopyButton
                    content={(contract as IICOContract).receiverAddress}
                  />
                </Space>
              </Text>
            </S.InfoItem>
          )}
        {type === ContractType.icoContract &&
          (contract as IICOContract).owner && (
            <S.InfoItem direction="vertical">
              <Text type="secondary">{t('owner')}:</Text>
              <Text>
                <Space size="small">
                  {shortenIfAddress((contract as IICOContract).owner)}
                  <CopyButton content={(contract as IICOContract).owner} />
                </Space>
              </Text>
            </S.InfoItem>
          )}
      </S.Info>
      <CopyField
        content={address}
        placeholder={t('contractIsNotDeployed')}
        css={{ marginTop: 32 }}
      />
    </S.Wrapper>
  );
};
