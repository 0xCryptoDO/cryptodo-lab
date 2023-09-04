import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Pencil1Icon } from '@radix-ui/react-icons';

import {
  ContractType,
  Currencies,
  networkCurrencies,
} from '@cryptodo/contracts';

import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import {
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  Space,
} from '@/components';
import * as S from '@/views/CreateToken/createToken.page.style';
import {
  CreateAiFunctionTag,
  CreateTokenAiOption,
  CreateTokenPricing,
} from '@/views/CreateToken/components';
import { useTypedSelector } from '@/reduxStore';

import { useCreateIcoHook } from './hooks';

export const CreateIco: FC<BaseCreateContractProps> = (props) => {
  const {
    nameContract,
    confirm,
    allFieldsDisabled,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    handleOpenModal,
    isTestnet,
  } = props;

  const selectedBlockchain = useTypedSelector(
    (state) => state.contracts.createToken.network
  );

  const {
    handleSubmit,
    register,
    errors,
    getFormData,
    formOptions,
    clearErrors,
    initialOwnerDisabled,
    toggleInitialOwner,
  } = useCreateIcoHook(handleOpenModal);

  const { t } = useTranslation('CreateToken');

  return (
    <>
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
      <S.Content>
        <S.Title>{t('createCrowdsaleContract')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          {nameContract}
        </S.Title>
        <Space direction="vertical" size="large">
          <S.ContentInputs size="middle">
            <Input
              {...register('name')}
              autoComplete="off"
              error={errors.name?.message}
              placeholder={t('contractName')}
              label={t('contractName')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.ico.contractName')}
            />
            <Input
              {...register('token')}
              autoComplete="off"
              error={errors.token?.message}
              placeholder={t('tokenContractAddress')}
              label={t('tokenContractAddress')}
              disabled={allFieldsDisabled}
              popover={t('tokenContractAddressInfo')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('price')}
              error={errors.price}
              noButtons
              placeholder={`${t('icoPrice')} ${
                Object.keys(
                  networkCurrencies[selectedBlockchain]
                )[0] as Currencies
              }`}
              label={`${t('icoPrice')} ${
                Object.keys(
                  networkCurrencies[selectedBlockchain]
                )[0] as Currencies
              }`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.ico.price')}
            />
            <NumberInput
              {...register('lockup', {
                valueAsNumber: true,
              })}
              error={errors.lockup}
              noButtons
              popover={t('lockupInfo')}
              placeholder={t('lockupInfo')}
              label={t('lockupInfo')}
              disabled={allFieldsDisabled}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('maxPerWallet', {
                valueAsNumber: true,
              })}
              error={errors.maxPerWallet}
              noButtons
              placeholder={t('maxPerWallet')}
              label={t('maxPerWallet')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.ico.maxPerWalletInfo')}
            />
            <Input
              {...register('receiverAddress')}
              autoComplete="off"
              label={t('fundsReceiverAddress')}
              placeholder={t('fundsReceiverAddress')}
              popover={t('popoverInfo.ico.fundsReceiverAddressInfo')}
              disabled={allFieldsDisabled}
              error={errors.receiverAddress?.message}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <Input
              {...register('owner')}
              autoComplete="off"
              error={errors.owner?.message}
              placeholder={t('initialOwner')}
              label={t('initialOwner')}
              disabled={initialOwnerDisabled || allFieldsDisabled}
              addonAfter={<Pencil1Icon />}
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
              type={ContractType.icoContract}
            />
          </S.Options>
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '5']}>
          <CreateTokenAiOption
            allFieldsDisabled={allFieldsDisabled}
            type={ContractType.icoContract}
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
        type={ContractType.icoContract}
      />
    </>
  );
};
