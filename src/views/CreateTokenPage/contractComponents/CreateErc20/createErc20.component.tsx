import { Pencil1Icon } from '@radix-ui/react-icons';
import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect, useState } from 'react';

import { ContractType } from '@cryptodo/contracts';
import { useEthers } from '@cryptodo/frontend-sdk';

import * as S from '@/views/CreateToken/createToken.page.style';
import { CollapseItem, DeployConfirmation, Divider, Input, NumberInput, Space } from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import { CreateTokenPricing, CreateTokenAiOption } from '@/views/CreateToken/components';

import { useCreateErc20Hook } from './hooks';
import { CreateTokenTags } from './components';

export const CreateErc20: FC<BaseCreateContractProps> = (props) => {
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
    handleChangeMint,
    register,
    errors,
    getFormData,
    trigger,
    getValues,
    formOptions,
    clearErrors,
  } = useCreateErc20Hook(handleOpenModal);

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
        <S.Title>{t('title')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          {nameContract}
        </S.Title>
        <Space direction="vertical" size="large">
          <S.ContentInputs size="middle">
            <Input
              {...register('name')}
              autoComplete="off"
              error={errors.name?.message}
              placeholder={t('tokenName')}
              label={t('tokenName')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.tokenName')}
            />
            <Input
              {...register('symbol', {
                setValueAs: (value: string) => value.toUpperCase(),
              })}
              onChange={({ target }) => {
                setValue('symbol', target.value.toUpperCase());
                trigger('symbol');
              }}
              autoComplete="off"
              error={errors.symbol?.message}
              placeholder={t('symbol')}
              label={`${t('symbol')} (BTC)`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.tokenSymbol')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('totalSupply', {
                valueAsNumber: true,
              })}
              error={errors.totalSupply}
              noButtons
              placeholder={t('initialSupply')}
              label={t('initialSupply')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.totalSupply')}
            />
            <NumberInput
              {...register('decimals', {
                valueAsNumber: true,
                value: 1,
              })}
              error={errors.decimals}
              getValue={() => getValues().decimals}
              handleButtonChange={(value) => setValue('decimals', +value)}
              min={1}
              max={18}
              label={`${t('decimals')} (1-18)`}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.decimals')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <Input
              {...register('initialOwner')}
              autoComplete="off"
              error={errors.initialOwner?.message}
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
          <CreateTokenTags allFieldsDisabled={allFieldsDisabled} />
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '5']}>
          {formOptions.mint && (
            <CollapseItem value="1" header={t('canMint')}>
              <Space size="large" direction="vertical">
                <NumberInput
                  noButtons
                  label={t('marketCap')}
                  required
                  placeholder="0"
                  {...register('options.mint.cap')}
                  disabled={allFieldsDisabled}
                  onChange={handleChangeMint}
                  error={errors.options?.mint?.cap}
                />
              </Space>
            </CollapseItem>
          )}
          <CreateTokenAiOption allFieldsDisabled={allFieldsDisabled} type={ContractType.erc20Contract} error={errors.options?.aiFunction?.message}  clearErrors={clearErrors}/>
        </S.Advanced>
      </S.Content>
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions}
        type={ContractType.erc20Contract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
