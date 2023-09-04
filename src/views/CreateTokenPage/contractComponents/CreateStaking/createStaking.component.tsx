import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

import { CombinedContractOptions, ContractType } from '@cryptodo/contracts';

import {
  Button,
  CollapseItem,
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  Space,
  Text,
  TokenTag,
} from '@/components';
import {
  CreateTokenAiOption,
  CreateTokenPricing,
} from '@/views/CreateToken/components';
import { Checkbox } from '@/components/atoms/Checkbox/checkbox';
import { useCreateStaking } from '@/views/CreateTokenPage/contractComponents/CreateStaking/hooks';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import { CreateAiFunctionTag } from '@/views/CreateToken/components/CreateAiFunctionTag/createAiFunctionTag';

import * as S from './createStaking.style';

export const CreateStaking: FC<BaseCreateContractProps> = (props) => {
  const {
    nameContract,
    allFieldsDisabled,
    handleOpenModal,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    confirm,
    isTestnet,
  } = props;

  const { t } = useTranslation('CreateToken');

  const {
    errors,
    register,
    handleSubmit,
    handleChangePenalty,
    formOptions,
    getFormData,
    tariffs,
    addTariff,
    removeTariff,
    togglePenalty,
    handleChangeChecked,
    isAvailableWithdrawInProcess,
    clearErrors,
  } = useCreateStaking(handleOpenModal);

  const handleClickSubmit = () => {
    confirm(getFormData(), isTestnet);
  };

  return (
    <>
      <S.Content>
        <S.Title>{t('titleContract')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          {nameContract}
        </S.Title>
        <S.DaoFields>
          <S.ContentInputs direction="vertical" size="big">
            <Input
              {...register('name')}
              autoComplete="off"
              required
              label={t('contractName')}
              placeholder={t('contractName')}
              disabled={allFieldsDisabled}
              error={errors.name?.message}
              popover={t('popoverInfo.staking.name')}
            />
            <Input
              {...register('token')}
              autoComplete="off"
              required
              error={errors.token?.message}
              placeholder={t('tokenContractAddress')}
              label={t('tokenContractAddress')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.staking.token')}
            />
            <S.MinMaxStake>
              <NumberInput
                {...register('minStake', {
                  valueAsNumber: true,
                })}
                defaultValue="1"
                label={t('minStakeInTokens')}
                min={1}
                noButtons
                error={errors.minStake}
              />
              <NumberInput
                {...register('maxStake', {
                  valueAsNumber: true,
                })}
                defaultValue="100"
                noButtons
                label={t('maxStakeInTokens')}
                min={1}
                error={errors.maxStake}
              />
            </S.MinMaxStake>
            <div>
              <Text popover="claim">{t('stakingPeriodAndRate')}</Text>
            </div>
            <S.ContentInputs direction="vertical">
              {tariffs.map((el, index) => (
                <Space>
                  <NumberInput
                    getValue={() => el.period}
                    min={1}
                    max={1000}
                    {...register(`tariffs.${index}.period`)}
                    handleButtonChange={(value) => {
                      tariffs[index].period = value;
                    }}
                    error={errors.tariffs?.[index]?.period}
                    label={ index === 0 ? t('daysAmount') : undefined }
                  />
                  <NumberInput
                    min={1}
                    max={1000}
                    getValue={() => el.percentage}
                    {...register(`tariffs.${index}.percentage`)}
                    handleButtonChange={(value) => {
                      tariffs[index].percentage = value;
                    }}
                    error={errors.tariffs?.[index]?.percentage}
                    label={ index === 0 ? t('percent') : undefined }
                  />
                  {index !== 0 ? (
                    <S.DeleteButton
                      onClick={() => removeTariff(index)}
                      theme="danger"
                    >
                      <S.Failed>
                        <Cross1Icon />
                      </S.Failed>
                    </S.DeleteButton>
                  ) : (
                    <S.DeleteButtonReplacement />
                  )}
                </Space>
              ))}
            </S.ContentInputs>
            <Button
              onClick={addTariff}
              theme="secondary"
              css={{ width: '100%', margin: '0 0 24px 0' }}
            >
              {t('addTariff')}
            </Button>
            <div>
              <Text popover="claim">{t('claimReward')}</Text>
              <S.ClaimRewardOptions>
                <Checkbox
                  label={t('inProcess')}
                  onCheckedChange={handleChangeChecked}
                  checked={isAvailableWithdrawInProcess}
                  name="inProcess"
                />
                <Checkbox
                  label={t('whenFinished')}
                  onCheckedChange={handleChangeChecked}
                  checked={!isAvailableWithdrawInProcess}
                  name="whenFinished"
                />
              </S.ClaimRewardOptions>
            </div>
            <Divider />
            <Space direction="vertical" size="middle">
              <S.AdvancedTitle>{t('options')}</S.AdvancedTitle>
              <S.Options size="small">
                <TokenTag
                  disabled={allFieldsDisabled}
                  isActive={formOptions.penalty !== undefined}
                  onClick={togglePenalty}
                  infoContent={t('penalty')}
                >
                  {t('penalty')}
                </TokenTag>
                <CreateAiFunctionTag
                  allFieldsDisabled={allFieldsDisabled}
                  type={ContractType.stakingContract}
                />
              </S.Options>
            </Space>
            <S.Advanced type="multiple" defaultValue={['1', '5']}>
              {formOptions.penalty !== undefined && (
                <CollapseItem value="1" header={t('penalty')}>
                  <Space size="large" direction="vertical">
                    <NumberInput
                      noButtons
                      label={t('penalty')}
                      required
                      placeholder="0"
                      disabled={allFieldsDisabled}
                      onChange={handleChangePenalty}
                      error={errors.options?.penalty}
                    />
                  </Space>
                </CollapseItem>
              )}
              <CreateTokenAiOption
                allFieldsDisabled={allFieldsDisabled}
                type={ContractType.stakingContract}
                clearErrors={clearErrors}
                error={errors.options?.aiFunction?.message}
              />
            </S.Advanced>
          </S.ContentInputs>
        </S.DaoFields>
      </S.Content>
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions as CombinedContractOptions}
        type={ContractType.stakingContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={handleClickSubmit}
      />
    </>
  );
};
