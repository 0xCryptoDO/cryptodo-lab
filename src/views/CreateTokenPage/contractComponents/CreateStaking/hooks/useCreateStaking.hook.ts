import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { ContractType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeStakingForm } from '@/views/CreateToken/redux/createToken.slice';
import { createStakingTokenFormValidation } from '@/views/CreateTokenPage/contractComponents/CreateStaking/createStaking.schema';

import { CreateStakingForm } from '../types/createStakingForm.interface';

export const useCreateStaking = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector(
    (state) => state.createToken[ContractType.stakingContract].options
  );

  const [isAvailableWithdrawInProcess, setIsAvailableWithdrawInProcess] =
    useState(false);

  const dispatch = useTypedDispatch();
  const {
    register,
    clearErrors,
    setValue,
    control,
    getValues,
    trigger,
    formState,
  } = useForm<CreateStakingForm>({
    resolver: yupResolver(createStakingTokenFormValidation),
    mode: 'onChange',
    shouldUnregister: true,
  });
  const { errors } = formState;

  const {
    fields: tariffs,
    append: appendTariff,
    remove: removeTariff,
  } = useFieldArray({
    control,
    name: 'tariffs',
  });

  const handleSubmit = async (isTestnet: boolean) => {
    setValue('options', formOptions);
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    handleOpenModal(isTestnet);
  };

  const handleChangeChecked = (value: boolean | string, name: string) => {
    if (!value) {
      return;
    }
    setIsAvailableWithdrawInProcess(name === 'inProcess');
  };

  const getFormData = () => {
    const formData = getValues();
    const lockPeriods = tariffs.map((el) => +el.period);
    const rewardRates = tariffs.map((el) => +el.percentage);
    return {
      ...formData,
      options: formOptions,
      isEarlyWithdrawal: isAvailableWithdrawInProcess,
      lockPeriods,
      rewardRates,
    };
  };

  const handleChangePenalty = (event: any) => {
    dispatch(
      changeStakingForm({
        options: {
          penalty: +event.target.value || 0,
        },
      })
    );
  };

  const addTariff = () => {
    const newTariff = {
      period: 1,
      percentage: 10,
    };
    appendTariff(newTariff);
  };

  const togglePenalty = () => {
    dispatch(
      changeStakingForm({
        options: {
          penalty: formOptions.penalty === undefined ? 0 : undefined,
        },
      })
    );
  };

  useEffect(() => {
    addTariff();
  }, []);

  return {
    getFormData,
    handleSubmit,
    handleChangePenalty,
    errors,
    register,
    setValue,
    trigger,
    togglePenalty,
    getValues,
    formOptions,
    addTariff,
    removeTariff,
    tariffs,
    isAvailableWithdrawInProcess,
    handleChangeChecked,
    clearErrors,
  };
};
