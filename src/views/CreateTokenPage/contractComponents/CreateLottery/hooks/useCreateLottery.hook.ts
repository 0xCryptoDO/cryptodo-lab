import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';

import { ContractType, LotteryType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeLotteryForm } from '@/views/CreateToken/redux/createToken.slice';

import { createLotteryTokenFormValidation } from '../createLotteryToken.schema';
import {
  CreateLotteryForm
} from '../types/createLotteryForm.interface';

export const useCreateLottery = (handleOpenModal: OpenCreateContractModal) => {
  const { lotteryType, lotteries, options: formOptions } = useTypedSelector((state) => state.createToken[ContractType.lotteryContract]);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  const {
    register,
    setValue,
    getValues,
    trigger,
    formState,
    control,
    resetField,
    clearErrors,
  } = useForm<CreateLotteryForm>({
    resolver: yupResolver(createLotteryTokenFormValidation) as any,
    mode: 'onChange',
    shouldUnregister: true,
  });
  const { errors } = formState;

  const handleSubmit = async (isTestnet: boolean) => {
    const isTypedPicked = lotteryType !== null;

    if (!isTypedPicked) {
      toast.error(t('noLotteryType') as string);
      return;
    }
    
    const sumOfWinnersPercentage = lotteries[lotteryType as LotteryType].winners.reduce((acc, el) => acc + el, 0);
    
    if (sumOfWinnersPercentage !== 100) {
      toast.error(t('common:errors.lotterySumOfWinners') as string);
      return;
    }

    const sumOfRewardsPercentage = lotteries[lotteryType as LotteryType].rewards.reduce((acc, el) => acc + el, 0);

    if (sumOfRewardsPercentage !== 100) {
      toast.error(t('common:errors.lotterySumOfRewards') as string);
      return;
    }

    setValue('options', formOptions);
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    handleOpenModal(isTestnet);
  };

  const getFormData = () => {
    const formData = getValues();
    const currentLottery = lotteries[lotteryType as LotteryType];
    
    let ticketsPrice;
    if (lotteryType === LotteryType.draw) {
      ticketsPrice = 0;
    } else {
      ticketsPrice = formData.ticketsPriceOrLotteryPool;
    }
    return {
      ...formData,
      lotteryType,
      ticketsPrice,
      winnersPercentage: currentLottery.winners,
      valuePercantage: currentLottery.rewards,
      startTime: new Date(formData.startTime).getTime(),
      endTime: new Date(formData.endTime).getTime(),
      options: formOptions,
    };
  };
  
  const changeLotteryType = (type: LotteryType) => {
    dispatch(changeLotteryForm({ lotteryType: type }));
  }

  return {
    getFormData,
    handleSubmit,
    errors,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    lotteries,
    lotteryType,
    control,
    resetField,
    changeLotteryType,
    clearErrors,
  };
};
