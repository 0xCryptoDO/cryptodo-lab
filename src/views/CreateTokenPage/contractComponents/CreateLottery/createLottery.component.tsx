import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { ContractType, LotteryType } from '@cryptodo/contracts';

import * as S from '@/views/CreateToken/createToken.page.style';
import {
  Button,
  DatePicker,
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  Slider,
  Space,
  TextArea,
  TokenCard,
  Tooltip,
} from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import { CreateAiFunctionTag, CreateTokenAiOption, CreateTokenPricing } from '@/views/CreateToken/components';

import { CloseIcon, InfoSmallIcon } from '@/assets/icons';
import { Nullable } from '@/types/nullable';
import { Lottery } from '@/views/CreateToken/context/createToken.page.types';

import { useCreateLottery, useLotteryForm } from './hooks';
import * as LocalStyles from './createLotteryToken.style';

const REWARDS_DEFAULT_VALUES = [10, 25, 50];
const WINNERS_DEFAULT_VALUES = [10, 25, 50];

export const CreateLottery: FC<BaseCreateContractProps> = (props) => {
  const {
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
    lotteries,
    lotteryType,
    resetField,
    control,
    changeLotteryType,
    clearErrors,
  } = useCreateLottery(handleOpenModal);

  const { t } = useTranslation('CreateToken');

  let currentLottery: Nullable<Lottery> = null;

  if (lotteryType !== null) {
    currentLottery = lotteries[lotteryType];
  }

  const {
    handleChangeWinnersSlider,
    handleAddSlider,
    handleDeleteSlider,
    handleChangeRewardsSlider,
  } = useLotteryForm();

  useEffect(() => {
    resetField('ticketsPriceOrLotteryPool');
  }, [lotteryType]);

  return (
    <>
      <S.Content>
        <S.Title>{t('createLotteryContract')}</S.Title>
        <LocalStyles.TypesRow size="middle" css={{ marginBottom: 20 }}>
          <TokenCard
            logo={
              <LocalStyles.TypeIcon
                src="/static/img/lottery/ethereum.svg"
                alt=""
              />
            }
            horizontal
            name={t('allOrNothing')}
            isActive={lotteryType === LotteryType.allOrNothing}
            onClick={() => changeLotteryType(LotteryType.allOrNothing)}
            popover={t('popoverInfo.lottery.allOrNothing')}
          />
          <TokenCard
            logo={
              <LocalStyles.TypeIcon
                src="/static/img/lottery/bitcoin.svg"
                alt=""
              />
            }
            horizontal
            name={t('winWin')}
            isActive={lotteryType === LotteryType.winWin}
            onClick={() => changeLotteryType(LotteryType.winWin)}
            popover={t('popoverInfo.lottery.winWin')}
          />
        </LocalStyles.TypesRow>
        <LocalStyles.TypesRow size="middle">
          <TokenCard
            logo={
              <LocalStyles.TypeIcon
                src="/static/img/lottery/cubes.svg"
                alt=""
              />
            }
            horizontal
            name={t('draw')}
            isActive={lotteryType === LotteryType.draw}
            onClick={() => changeLotteryType(LotteryType.draw)}
            popover={t('popoverInfo.lottery.draw')}
          />
          <TokenCard
            logo={
              <LocalStyles.TypeIcon src="/static/img/lottery/gear.svg" alt="" />
            }
            horizontal
            name={t('custom')}
            isActive={lotteryType === LotteryType.custom}
            onClick={() => changeLotteryType(LotteryType.custom)}
            popover={t('popoverInfo.lottery.custom')}
          />
        </LocalStyles.TypesRow>
        <Space direction="vertical" size="large">
          <S.ContentInputs size="middle">
            <Input
              {...register('name')}
              autoComplete="off"
              error={errors.name?.message}
              placeholder={t('lotteryName')}
              label={t('lotteryName')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.lottery.name')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('ticketsPriceOrLotteryPool', {
                valueAsNumber: true,
              })}
              error={errors.ticketsPriceOrLotteryPool}
              placeholder={t(
                lotteryType === LotteryType.draw
                  ? 'lotteryPool'
                  : 'ticketsPrice'
              )}
              label={t(
                lotteryType === LotteryType.draw
                  ? 'lotteryPool'
                  : 'ticketsPrice'
              )}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.lottery.ticketsPrice')}
              noButtons
            />
            <NumberInput
              {...register('ticketsAmount', { valueAsNumber: true })}
              error={errors.ticketsAmount}
              min={10}
              placeholder={t('ticketsAmount')}
              label={t('ticketsAmount')}
              disabled={allFieldsDisabled}
              popover={t('popoverInfo.lottery.ticketsAmount')}
              noButtons
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <Controller
              defaultValue={new Date()}
              control={control}
              name="startTime"
              render={({ field }) => (
                <DatePicker
                  label={t('startTime')}
                  disabled={allFieldsDisabled}
                  {...field}
                  error={errors.startTime}
                  minDate={new Date()}
                  errorMessage={
                    // @ts-ignore
                    errors.startTime?.message?.text
                      ? // @ts-ignore
                        `${errors.startTime?.message?.text}`
                      : null
                  }
                />
              )}
            />
            <Controller
              defaultValue={
                new Date(new Date().setHours(new Date().getHours() + 1))
              }
              control={control}
              name="endTime"
              render={({ field }) => (
                <DatePicker
                  label={t('endTime')}
                  disabled={allFieldsDisabled}
                  {...field}
                  error={errors.endTime}
                  minDate={
                    new Date(new Date().setHours(new Date().getHours() + 1))
                  }
                  errorMessage={
                    // @ts-ignore
                    errors.endTime?.message?.text
                      ? // @ts-ignore
                        `${errors.endTime?.message?.text}`
                      : null
                  }
                />
              )}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <NumberInput
              {...register('ownerFee', {
                valueAsNumber: true,
              })}
              error={errors.ownerFee}
              placeholder={t('ownerFee')}
              max={30}
              min={0}
              label={t('ownerFee')}
              disabled={allFieldsDisabled}
              getValue={() => getValues('ownerFee')}
              handleButtonChange={(value) => setValue('ownerFee', value)}
              popover={t('popoverInfo.lottery.ownerFee')}
            />
          </S.ContentInputs>
          <S.ContentInputs size="middle">
            <TextArea
              {...register('description')}
              autoComplete="off"
              error={errors.description?.message}
              placeholder={t('description')}
              label={t('description')}
              disabled={allFieldsDisabled}
            />
          </S.ContentInputs>
        </Space>
        {currentLottery !== null && (
          <LocalStyles.AdditionalBlock>
            <Space direction="vertical" size="large">
              <S.Title margin="no">{t('customPercentageTitle')}</S.Title>
              <LocalStyles.SlidesContainer direction="horizontal" size="large">
                <LocalStyles.SliderColumn>
                  <LocalStyles.InfoLabel>
                    {t('winnersPercentage')}
                    <Tooltip content="123123123">
                      <LocalStyles.TooltipButton>
                        <InfoSmallIcon />
                      </LocalStyles.TooltipButton>
                    </Tooltip>
                  </LocalStyles.InfoLabel>
                  <Space direction="vertical" size="middle">
                    {currentLottery.winners.map((item, index) => (
                      <Space
                        size="middle"
                        direction="vertical"
                        // eslint-disable-next-line react/no-array-index-key
                        key={`winner-${index}`}
                      >
                        <Space size="middle">
                          <Slider
                            value={item}
                            setValue={(value) =>
                              handleChangeWinnersSlider(value, index)
                            }
                          />
                          <LocalStyles.Percentage>
                            {item}%
                          </LocalStyles.Percentage>
                        </Space>
                        <LocalStyles.ButtonsSpace size="middle">
                          {WINNERS_DEFAULT_VALUES.map((el) => (
                            <Button
                              stretch
                              theme="secondary"
                              onClick={() =>
                                handleChangeWinnersSlider(el, index)
                              }
                            >
                              {el}%
                            </Button>
                          ))}
                        </LocalStyles.ButtonsSpace>
                      </Space>
                    ))}
                  </Space>
                </LocalStyles.SliderColumn>
                <LocalStyles.SliderColumn>
                  <LocalStyles.InfoLabel>
                    {t('rewardPercentage')}
                    <Tooltip content="123123123">
                      <LocalStyles.TooltipButton>
                        <InfoSmallIcon />
                      </LocalStyles.TooltipButton>
                    </Tooltip>
                  </LocalStyles.InfoLabel>
                  <Space direction="vertical" size="middle">
                    {currentLottery.rewards.map((item, index) => (
                      <LocalStyles.SliderSpace
                        size="middle"
                        direction="vertical"
                        // eslint-disable-next-line react/no-array-index-key
                        key={`rewards-${index}`}
                      >
                        <Space size="middle">
                          <Slider
                            value={item}
                            setValue={(value) =>
                              handleChangeRewardsSlider(value, index)
                            }
                          />
                          <LocalStyles.Percentage>
                            {item}%
                          </LocalStyles.Percentage>
                        </Space>
                        <LocalStyles.ButtonsSpace size="middle">
                          {REWARDS_DEFAULT_VALUES.map((el) => (
                            <Button
                              stretch
                              theme="secondary"
                              onClick={() =>
                                handleChangeWinnersSlider(el, index)
                              }
                            >
                              {el}%
                            </Button>
                          ))}
                        </LocalStyles.ButtonsSpace>
                        {index > currentLottery!.minRows - 1 && (
                          <LocalStyles.DeleteSlider
                            onClick={() => handleDeleteSlider(index)}
                          >
                            <CloseIcon />
                          </LocalStyles.DeleteSlider>
                        )}
                      </LocalStyles.SliderSpace>
                    ))}
                  </Space>
                </LocalStyles.SliderColumn>
              </LocalStyles.SlidesContainer>
              <Space direction="vertical" align="center">
                <Button
                  onClick={handleAddSlider}
                  theme="secondary"
                  css={{ fontSize: 20 }}
                >
                  +
                </Button>
              </Space>
            </Space>
          </LocalStyles.AdditionalBlock>
        )}
        <Divider />
        <Space direction="vertical" size="middle">
          <S.AdvancedTitle>{t('options')}</S.AdvancedTitle>
          <S.Options size="small">
            <CreateAiFunctionTag allFieldsDisabled={allFieldsDisabled} type={ContractType.lotteryContract} />
          </S.Options>
        </Space>
        <S.Advanced type="multiple" defaultValue={['1', '5']}>
          <CreateTokenAiOption allFieldsDisabled={allFieldsDisabled} type={ContractType.lotteryContract} clearErrors={clearErrors} error={errors.options?.aiFunction?.message} />
        </S.Advanced>
      </S.Content>
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions}
        type={ContractType.lotteryContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
