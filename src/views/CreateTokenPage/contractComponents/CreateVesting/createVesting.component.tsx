import { Cross1Icon } from '@radix-ui/react-icons';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { ContractType, VestingType } from '@cryptodo/contracts';

import {
  Button,
  DatePicker,
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  Space,
  Text,
  TokenCard,
} from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import { CreateTokenPricing, CreateTokenAiOption, CreateAiFunctionTag } from '@/views/CreateToken/components';

import { useVesting } from './hooks';
import * as S from './createVesting.style';

export const CreateVesting: FC<BaseCreateContractProps> = (props) => {
  const {
    nameContract,
    allFieldsDisabled,
    handleOpenModal,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    confirm,
    isTestnet,
  } = props;

  const {
    setValue,
    handleSubmit,
    register,
    errors,
    getFormData,
    getValues,
    formOptions,
    vestingType,
    changeVestingType,
    control,
    partners,
    removePartner,
    addNewToVestingCalendar,
    removeFromVestingCalendar,
    vestingCalendar,
    addNewPartner,
    getMinDate,
    clearErrors,
  } = useVesting(handleOpenModal);

  const { t } = useTranslation('CreateToken');

  const getPartner = () =>
    partners.map((partner, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${partner}-${index}`}>
        <div>
          <S.ContentPartners
            position={
              errors.partners?.[index]?.partnerAddress?.message
                ? 'center'
                : 'end'
            }
          >
            <S.ContentInputs size="middle">
              <S.InputWrapper>
                <Input
                  key={partner.id}
                  {...register(`partners.${index}.partnerAddress`, {
                    onChange: (e) => {
                      partners[index].partnerAddress = e.target.value;
                    },
                  })}
                  autoComplete="off"
                  required
                  error={errors.partners?.[index]?.partnerAddress?.message}
                  placeholder={t('tokenRecipientAddress')}
                  defaultValue={partner?.partnerAddress}
                  disabled={allFieldsDisabled}
                  label={index === 0 ? t('tokenRecipientAddress') : null}
                  popover={
                    index === 0 ? t('popoverInfo.vesting.addresses') : null
                  }
                />
              </S.InputWrapper>
              <S.NumberInputContainer>
                <NumberInput
                  key={partner.id}
                  {...register(`partners.${index}.GTAmount`, {
                  valueAsNumber: true,
                    onChange: (e) => {
                      partners[index].GTAmount = +e.target.value;
                    },
                  })}
                  error={errors.partners?.[index]?.GTAmount}
                  noButtons
                  disabled={allFieldsDisabled}
                  required
                  label={index === 0 ? t('tokenAmount') : null}
                  placeholder={t('tokenAmount')}
                  defaultValue={String(partner.GTAmount)}
                  popover={
                    index === 0 ? t('popoverInfo.vesting.amounts') : null
                  }
                />
              </S.NumberInputContainer>
              <S.ButtonWrapper>
                {index !== 0 && (
                  <S.DeleteButton
                    onClick={() => removePartner(index)}
                    theme="danger"
                  >
                    <S.Failed>
                      <Cross1Icon />
                    </S.Failed>
                  </S.DeleteButton>
                )}
              </S.ButtonWrapper>
            </S.ContentInputs>
          </S.ContentPartners>
        </div>
        <S.ContentPartners
          position={
            errors.partners?.[index]?.GTAmount?.message ? 'center' : 'end'
          }
        />
      </div>
    ));

  return (
    <>
      <S.Content>
        <S.Title>{t('titleContract')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          {nameContract}
        </S.Title>
        <S.DaoFields>
          <Text weight="middle" size="big">
            {t('createVestingContract')}
          </Text>{' '}
          <Space size="middle" css={{ marginBottom: 20, marginTop: 20 }}>
            <TokenCard
              logo={<S.TypeIcon src="/static/img/vesting/lock.svg" alt="" />}
              horizontal
              name={t('tokenLockerContract')}
              isActive={vestingType === VestingType.locker}
              onClick={() => changeVestingType(VestingType.locker)}
              popover={t('popoverInfo.vesting.tokenLockerContract')}
            />
            <TokenCard
              logo={<S.TypeIcon src="/static/img/vesting/cliff.svg" alt="" />}
              horizontal
              name={t('cliffVestingContract')}
              isActive={vestingType === VestingType.vesting}
              onClick={() => changeVestingType(VestingType.vesting)}
              popover={t('popoverInfo.vesting.cliffVestingContract')}
            />
          </Space>
          <S.ContentInputs direction="vertical" size="big">
            <Input
              {...register('name')}
              autoComplete="off"
              required
              label={t('contractName')}
              placeholder={t('contractName')}
              disabled={allFieldsDisabled}
              error={errors.name?.message}
              popover={t('popoverInfo.vesting.name')}
            />
            <Input
              {...register('token')}
              autoComplete="off"
              required
              error={errors.token?.message}
              placeholder={t('tokenContractAddress')}
              label={t('tokenContractAddress')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.vesting.token')}
            />
          </S.ContentInputs>
          <S.ContentInputs direction="vertical" size="small">
            {partners.length !== 0 && getPartner()}
          </S.ContentInputs>
          <Button
            onClick={addNewPartner}
            theme="secondary"
            css={{ width: '100%', margin: '0 0 24px 0' }}
          >
            {t('addAddress')}
          </Button>
          <S.NumberInputWrapper>
            <NumberInput
              {...register('lockDuration', {
                valueAsNumber: true,
              })}
              error={errors.lockDuration}
              placeholder={t('cliffPeriod')}
              min={0}
              label={t('cliffPeriod')}
              disabled={allFieldsDisabled}
              defaultValue="0"
              noButtons
              getValue={() => getValues('lockDuration')}
              handleButtonChange={(value) => setValue('lockDuration', value)}
              popover={t('popoverInfo.vesting.lockDuration')}
            />
          </S.NumberInputWrapper>
          {vestingType === VestingType.vesting && (
            <S.TableWrapper>
              <Text size="big" align="center">
                {t('vestingCalendar')}
              </Text>
              <S.Table>
                <S.Tablebody>
                  {vestingCalendar.map((el, index) => (
                    <S.TRow key={el.id}>
                      <S.TCell>
                        <Controller
                          control={control}
                          name={`vestingCalendar.${index}.date`}
                          render={({ field }) => (
                            <DatePicker
                              {...register(
                                `vestingCalendar.${index}.date` as const,
                                {
                                  onChange: (e) => {
                                    vestingCalendar[index].date =
                                      e.target.value;
                                  },
                                }
                              )}
                              disabled={allFieldsDisabled}
                              {...field}
                              showTimeInput={false}
                              dateFormat="dd/MM/yyyy"
                              value={vestingCalendar[index].date}
                              minDate={getMinDate(index)}
                              label={index === 0 ? t('date') : undefined}
                              popover={
                                index === 0
                                  ? t('popoverInfo.vesting.unlockDates')
                                  : undefined
                              }
                            />
                          )}
                        />
                      </S.TCell>
                      <S.TCell>
                        <NumberInput
                          {...register(
                            `vestingCalendar.${index}.percentage` as const,
                            {
                              onChange: (e) => {
                                vestingCalendar[index].percentage =
                                  +e.target.value;
                              },
                            }
                          )}
                          error={errors.vestingCalendar?.[index]?.percentage}
                          noButtons
                          min={0}
                          max={100}
                          label={index === 0 ? t('unlockPercents') : null}
                          popover={
                            index === 0
                              ? t('popoverInfo.vesting.unlockPercents')
                              : null
                          }
                        />
                      </S.TCell>
                      <S.TCell>
                        <S.ButtonWrapper>
                          {index !== 0 && (
                            <S.DeleteButton
                              onClick={() => removeFromVestingCalendar(index)}
                              theme="danger"
                            >
                              <S.Failed>
                                <Cross1Icon />
                              </S.Failed>
                            </S.DeleteButton>
                          )}
                        </S.ButtonWrapper>
                      </S.TCell>
                    </S.TRow>
                  ))}
                </S.Tablebody>
              </S.Table>
              <S.TCell>
                <S.ButtonWrapper style={{ justifyContent: 'center' }}>
                  <Button onClick={addNewToVestingCalendar}>
                    {t('addRow')}
                  </Button>
                </S.ButtonWrapper>
              </S.TCell>
            </S.TableWrapper>
          )}
        </S.DaoFields>
        <Divider />
        <Space direction="vertical" size="middle">
          <S.AdvancedTitle>{t('options')}</S.AdvancedTitle>
          <S.Options size="small">
            <CreateAiFunctionTag
              allFieldsDisabled={allFieldsDisabled}
              type={ContractType.vestingContract}
            />
          </S.Options>
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '2', '3', '4', '5']}>
          <CreateTokenAiOption
            allFieldsDisabled={allFieldsDisabled}
            type={ContractType.vestingContract}
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
        type={ContractType.vestingContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
