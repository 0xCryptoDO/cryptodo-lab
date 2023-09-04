import { Pencil1Icon } from '@radix-ui/react-icons';
import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { ContractType } from '@cryptodo/contracts';
import { useEthers } from '@cryptodo/frontend-sdk';

import * as S from '@/views/CreateToken/createToken.page.style';
import {
  CollapseItem,
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  Space,
} from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import {
  CreateTokenAiOption,
  CreateTokenPricing,
} from '@/views/CreateToken/components';

import { useErc20DefHook } from './hooks';
import { CreateDefTokenTags } from './components';

export const CreateErc20Def: FC<BaseCreateContractProps> = (props) => {
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
    getValues,
    formOptions,
    handleChangeMint,
    handleChangeRouter,
    handleChangeLiquidity,
    handleChangeTeamFee,
    handleChangeTeamWallet,
    handleChangeBurnFee,
    clearErrors,
    control,
  } = useErc20DefHook(handleOpenModal);

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
          ({nameContract})
        </S.Title>
        <Space direction="vertical" size="large">
          <S.ContentInputs size="middle">
            <Input
              {...register('name')}
              error={errors.name?.message}
              autoComplete="off"
              placeholder={t('tokenName')}
              label={t('tokenName')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.tokenName')}
            />
            <Controller control={control} render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                onChange={(event) => {
                  event.target.value = event.target.value.toUpperCase();
                  onChange(event);
                }}
                onBlur={onBlur}
                value={value}
                ref={ref}
                autoComplete="off"
                error={errors.symbol?.message}
                placeholder={t('symbol')}
                label={`${t('symbol')} (BTC)`}
                disabled={allFieldsDisabled}
                popover={t('popoverInfo.tokenSymbol')}
              />
            )} name='symbol' />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('totalSupply')}
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
              handleButtonChange={(value) => setValue('decimals', value)}
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
              error={errors.initialOwner?.message}
              autoComplete="off"
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
          <CreateDefTokenTags allFieldsDisabled={allFieldsDisabled} />
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '2', '3', '4', '5']}>
          {formOptions.mint !== undefined && (
            <CollapseItem value="1" header={t('canMint')}>
              <Space size="large" direction="vertical">
                <NumberInput
                  noButtons
                  label={t('marketCap')}
                  required
                  placeholder="0"
                  disabled={allFieldsDisabled}
                  value={formOptions.mint.cap}
                  error={errors.options?.mint?.cap}
                  onChange={handleChangeMint}
                />
              </Space>
            </CollapseItem>
          )}
          {formOptions.liquidity && (
            <CollapseItem value="2" header={t('liquidity')}>
              <Space size="large" direction="vertical">
                <Input
                  label={t('router')}
                  required
                  placeholder=""
                  disabled={allFieldsDisabled}
                  value={formOptions.liquidity.router}
                  error={errors.options?.liquidity?.router?.message}
                  onChange={handleChangeRouter}
                />
                <NumberInput
                  noButtons
                  label={t('liquidityFee')}
                  required
                  placeholder="0"
                  disabled={allFieldsDisabled}
                  value={formOptions.liquidity.liquidityFee}
                  error={errors.options?.liquidity?.liquidityFee}
                  onChange={handleChangeLiquidity}
                />
              </Space>
            </CollapseItem>
          )}
          {formOptions.team && (
            <CollapseItem value="3" header={t('team')}>
              <Space size="large" direction="vertical">
                <NumberInput
                  noButtons
                  label={t('teamFee')}
                  required
                  placeholder="0"
                  disabled={allFieldsDisabled}
                  value={formOptions.team.teamFee}
                  error={errors.options?.team?.teamFee}
                  onChange={handleChangeTeamFee}
                />
                <Input
                  label={t('teamWallet')}
                  required
                  placeholder=""
                  disabled={allFieldsDisabled}
                  value={formOptions.team.teamWallet}
                  error={errors.options?.team?.teamWallet?.message}
                  onChange={handleChangeTeamWallet}
                />
              </Space>
            </CollapseItem>
          )}
          {formOptions.taxBurn && (
            <CollapseItem value="4" header={t('taxBurn')}>
              <Space size="large" direction="vertical">
                <NumberInput
                  noButtons
                  label={t('burnFee')}
                  required
                  placeholder="0"
                  disabled={allFieldsDisabled}
                  value={formOptions.taxBurn.burnFee}
                  error={errors.options?.taxBurn?.burnFee}
                  onChange={handleChangeBurnFee}
                />
              </Space>
            </CollapseItem>
          )}
          <CreateTokenAiOption
            clearErrors={clearErrors}
            allFieldsDisabled={allFieldsDisabled}
            type={ContractType.erc20DefContract}
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
        type={ContractType.erc20DefContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
