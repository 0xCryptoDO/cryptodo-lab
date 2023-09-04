import { Pencil1Icon } from '@radix-ui/react-icons';
import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { ContractType } from '@cryptodo/contracts';
import { useEthers } from '@cryptodo/frontend-sdk';

import * as S from '@/views/CreateToken/createToken.page.style';
import {
  DatePicker,
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  Space,
} from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import { CreateTokenAiOption, CreateTokenPricing } from '@/views/CreateToken/components';

import { useCreateErc721 } from './hooks';
import { CreateErc721TokenTags } from './components';

export const CreateErc721: FC<BaseCreateContractProps> = (props) => {
  const {
    nameContract,
    allFieldsDisabled,
    handleOpenModal,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    confirm,
    isTestnet,
  } = props;

  const [initialOwnerDisabled, toggleInitialOwner] = useState(true);

  const {
    setValue,
    handleSubmit,
    register,
    errors,
    getFormData,
    trigger,
    formOptions,
    control,
    getErrorMessage,
    clearErrors,
  } = useCreateErc721(handleOpenModal);

  const { account } = useEthers();

  const { t } = useTranslation('CreateToken');

  useEffect(() => {
    if (account) {
      setValue('owner', account);
    }
  }, [account]);

  return (
    <>
      <S.Content>
        <S.Title>{t('titleNft')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          ({nameContract})
        </S.Title>
        <Space direction="vertical" size="large">
          <S.ContentInputs size="middle">
            <Input
              {...register('contractName')}
              autoComplete="off"
              error={errors.contractName?.message}
              placeholder={t('nftContractName')}
              label={t('nftContractName')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.contractName')}
            />
            <NumberInput
              {...register('totalSupply', {
                valueAsNumber: true,
              })}
              error={errors.totalSupply}
              noButtons
              placeholder={`NFT ${t('totalSupply')}`}
              label={`NFT ${t('totalSupply')}`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.totalSupply')}
            />
            <Input
              {...register('name')}
              autoComplete="off"
              error={errors.name?.message}
              placeholder={t('name')}
              label={t('name')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.name')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <Input
              {...register('symbol')}
              onChange={({ target }) => {
                setValue('symbol', target.value.toUpperCase());
                trigger('symbol');
              }}
              autoComplete="off"
              error={errors.symbol?.message}
              placeholder={t('symbol')}
              label={`${t('symbol')} (NFT)`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.symbol')}
            />
            <NumberInput
              {...register('tokenPerTx', {
                valueAsNumber: true,
              })}
              error={errors.tokenPerTx}
              noButtons
              placeholder={t('tokenPerTx')}
              label={t('tokenPerTx')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.tokenPerTx')}
            />
            <NumberInput
              {...register('tokenPerWallet', {
                valueAsNumber: true,
              })}
              error={errors.tokenPerWallet}
              noButtons
              placeholder={t('tokenPerWallet')}
              label={t('tokenPerWallet')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.tokenPerWallet')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('price', {
                valueAsNumber: true,
              })}
              error={errors.price}
              noButtons
              placeholder={t('nftPrice')}
              label={t('nftPrice')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.price')}
            />
            <Controller
              name="timeForReveal"
              control={control}
              defaultValue={new Date()}
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <DatePicker
                  label={t('timeForReveal')}
                  disabled={allFieldsDisabled}
                  {...field}
                  errorMessage={getErrorMessage()}
                  error={errors.timeForReveal}
                  minDate={new Date()}
                  popover={t('popoverInfo.nft.timeForReveal')}
                />
              )}
            />
            <Input
              {...register('uri')}
              autoComplete="off"
              error={errors.uri?.message}
              placeholder={t('uri')}
              label={`${t('uri')}`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.uri')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <Input
              {...register('founder')}
              autoComplete="off"
              error={errors.founder?.message}
              placeholder={t('founder')}
              label={`${t('founder')}`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.nft.founder')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <Input
              {...register('owner')}
              autoComplete="off"
              error={errors.owner?.message}
              placeholder={t('owner')}
              label={t('owner')}
              disabled={initialOwnerDisabled || allFieldsDisabled}
              addonAfter={<Pencil1Icon />}
              addonAfterClick={() => {
                toggleInitialOwner(false);
              }}
              popover={t('popoverInfo.nft.owner')}
            />
          </S.ContentInputs>
        </Space>
        <Divider />
        <Space direction="vertical" size="middle">
          <S.AdvancedTitle>{t('options')}</S.AdvancedTitle>
          <CreateErc721TokenTags allFieldsDisabled={allFieldsDisabled} />
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '5']}>
          <CreateTokenAiOption allFieldsDisabled={allFieldsDisabled} type={ContractType.erc721Contract} clearErrors={clearErrors} error={errors.options?.aiFunction?.message} />
        </S.Advanced>
      </S.Content>
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions}
        type={ContractType.erc721Contract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
