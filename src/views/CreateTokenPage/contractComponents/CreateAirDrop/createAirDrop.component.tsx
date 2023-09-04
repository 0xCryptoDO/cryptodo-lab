import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect, useState } from 'react';

import {
  AirDropType,
  ContractType,
  Currencies,
  networkCurrencies,
} from '@cryptodo/contracts';
import { useEthers } from '@cryptodo/frontend-sdk';

import * as S from '@/views/CreateToken/createToken.page.style';
import {
  DeployConfirmation,
  Divider,
  Input,
  Space,
  TokenCard,
} from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import {
  CreateAiFunctionTag,
  CreateTokenAiOption,
  CreateTokenPricing,
} from '@/views/CreateToken/components';
import { useAirDrop } from '@/views/CreateTokenPage/contractComponents/CreateAirDrop/hooks/useAirDrop.hook';
import { useTypedSelector } from '@/reduxStore';

import * as LocalStyles from './createAirDropToken.style';

export const CreateAirDrop: FC<BaseCreateContractProps> = (props) => {
  const {
    allFieldsDisabled,
    handleOpenModal,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    confirm,
    isTestnet,
  } = props;

  const selectedBlockchain = useTypedSelector(
    (state) => state.contracts.createToken.network
  );

  const [initialOwnerDisabled, toggleInitialOwner] = useState(true);

  const {
    setValue,
    handleSubmit,
    register,
    errors,
    getFormData,
    formOptions,
    airDropType,
    changeAirDropType,
    clearErrors,
  } = useAirDrop(handleOpenModal);
  const { account } = useEthers();
  const { t } = useTranslation('CreateToken');

  useEffect(() => {
    if (account) {
      setValue('initialOwner', account);
    }
  }, [account]);

  return (
    <>
      <S.Content>
        <S.Title css={{ marginTop: 40, paddingBottom: 40 }}>
          {t('createAirDropContract')}
        </S.Title>
        <Space size="large" css={{ marginBottom: 80 }}>
          <TokenCard
            logo={
              <LocalStyles.TypeIcon
                src="/static/img/airDrop/bitcoin.svg"
                alt=""
              />
            }
            horizontal
            name={t(
              `Multisend ${
                Object.keys(
                  networkCurrencies[selectedBlockchain]
                )[0] as Currencies
              }`
            )}
            popover={t('bnbMutlisend')}
            isActive={airDropType === AirDropType.bnbMutlisend}
            onClick={() => changeAirDropType(AirDropType.bnbMutlisend)}
          />
          <TokenCard
            logo={
              <LocalStyles.TypeIcon
                src="/static/img/airDrop/erc20.svg"
                alt=""
              />
            }
            horizontal
            name={t('Multisend ERC-20')}
            popover={t('tokenMultisend')}
            isActive={airDropType === AirDropType.tokenMultisend}
            onClick={() => changeAirDropType(AirDropType.tokenMultisend)}
          />
        </Space>
        <Space size="large">
          <S.ContentInputs direction="vertical" size="big">
            <Input
              {...register('name')}
              autoComplete="off"
              error={errors.name?.message}
              placeholder={t('contractName')}
              label={t('contractName')}
              disabled={allFieldsDisabled}
            />
            <Input
              {...register('initialOwner')}
              error={errors.initialOwner?.message}
              autoComplete="off"
              placeholder={t('initialOwner')}
              label={t('initialOwner')}
              disabled={initialOwnerDisabled || allFieldsDisabled}
              addonAfterClick={() => {
                toggleInitialOwner(false);
              }}
            />
          </S.ContentInputs>
        </Space>
        <Divider />
        <Space direction="vertical" size="middle">
          <S.AdvancedTitle>{t('options')}</S.AdvancedTitle>
          <S.Options size="small">
            <CreateAiFunctionTag
              allFieldsDisabled={allFieldsDisabled}
              type={ContractType.airDropContract}
            />
          </S.Options>
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '5']}>
          <CreateTokenAiOption
            allFieldsDisabled={allFieldsDisabled}
            type={ContractType.airDropContract}
            clearErrors={clearErrors}
            error={errors.options?.aiFunction?.message}
          />
        </S.Advanced>
      </S.Content>
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions}
        type={ContractType.airDropContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
