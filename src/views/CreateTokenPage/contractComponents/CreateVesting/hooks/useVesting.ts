import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { ContractType, VestingType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeVestingForm } from '@/views/CreateToken/redux/createToken.slice';

import { createVestingTokenFormValidation } from '../createVesting.schema';
import { CreateVestingForm } from '../types/createVestingForm.interface';
import { VestingCalendarItem } from '../types/vestingCalendarItem.interface';

export const useVesting = (handleOpenModal: OpenCreateContractModal) => {
  const vestingType = useTypedSelector(
    (state) => state.createToken[ContractType.vestingContract].vestingType
  );
  const formOptions = useTypedSelector(
    (state) => state.createToken[ContractType.vestingContract].options
  );

  const [arr, setArr] = useState<VestingCalendarItem[]>([]);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  const {
    register,
    clearErrors,
    setValue,
    getValues,
    control,
    trigger,
    formState,
  } = useForm<CreateVestingForm>({
    resolver: yupResolver(createVestingTokenFormValidation) as any,
    mode: 'onChange',
    shouldUnregister: true,
  });
  const { errors } = formState;

  const {
    fields: partners,
    append: appendPartner,
    remove: removePartner,
  } = useFieldArray({
    control,
    name: 'partners',
  });

  const {
    fields: vestingCalendar,
    append: addToVestingCalendar,
    remove: removeFromVestingCalendar,
    replace: replaceVestingCalendar,
  } = useFieldArray({
    control,
    shouldUnregister: false,
    name: 'vestingCalendar',
  });

  const addNewPartner = () => {
    const partner = {
      partnerAddress: '',
      GTAmount: 1,
    };
    appendPartner(partner);
  };

  const getMinDate = (index: number) => {
    const date = new Date();
    if (index === 0) {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(vestingCalendar[index - 1].date.getDate() + 1);
    }

    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);

    return date;
  };

  const addNewToVestingCalendar = () => {
    addToVestingCalendar({
      date: getMinDate(vestingCalendar.length),
      percentage: 10,
    });
  };

  useEffect(() => {
    addNewPartner();
    setArr([
      {
        date: getMinDate(vestingCalendar.length),
        percentage: 10,
      },
      {
        date: getMinDate(vestingCalendar.length),
        percentage: 10,
      },
    ]);
  }, []);

  const validateVestingCalendar = () => {
    const sumOfPercentages = vestingCalendar.reduce(
      (acc, el) => acc + +el.percentage,
      0
    );

    if (sumOfPercentages !== 100) {
      toast.error(t('common:errors.unlockPercentageSum') as string);
      return false;
    }

    const dates = vestingCalendar.map((el) => el.date.getTime());
    const datesUnique = [...new Set(dates)];

    const isDatesUnique = datesUnique.length === dates.length;

    if (!isDatesUnique) {
      toast.error(t('common:errors.unlockDatesUnique') as string);
      return false;
    }

    return true;
  };

  const handleSubmit = async (isTestnet: boolean) => {
    setValue('options', formOptions);
    const isTypedPicked = vestingType !== null;

    if (!isTypedPicked) {
      toast.error(t('noVestingType') as string);
      return;
    }

    const isValid =
      (await trigger()) &&
      (vestingType === VestingType.vesting ? validateVestingCalendar() : true);

    if (!isValid) {
      return;
    }

    handleOpenModal(isTestnet);
  };

  const getFormData = () => {
    const formData = getValues();
    const addresses = formData.partners.map((el) => el.partnerAddress);
    const amounts = formData.partners.map((el) => +el.GTAmount);

    if (vestingType === VestingType.locker) {
      return {
        name: formData.name,
        token: formData.token,
        lockDuration: formData.lockDuration,
        vestingType,
        addresses,
        amounts,
        options: formOptions,
      };
    }

    const unlockDates = formData.vestingCalendar.map((el) => {
      const currentDate = el.date;
      currentDate.setDate(currentDate.getDate() + formData.lockDuration);
      currentDate.setMilliseconds(0);
      currentDate.setSeconds(0);
      currentDate.setMinutes(0);
      currentDate.setHours(0);
      return currentDate.getTime();
    });
    const unlockPercents = formData.vestingCalendar.map((el) => +el.percentage);

    return {
      name: formData.name,
      token: formData.token,
      lockDuration: 0,
      vestingType,
      addresses,
      amounts,
      unlockDates,
      unlockPercents,
      options: formOptions,
    };
  };

  const changeVestingType = (type: VestingType) => {
    if (type === VestingType.vesting) {
      replaceVestingCalendar(arr);
    } else {
      setArr(vestingCalendar);
      replaceVestingCalendar([]);
    }
    dispatch(changeVestingForm({ vestingType: type }));
  };

  return {
    vestingType,
    changeVestingType,
    formState,
    getFormData,
    errors,
    handleSubmit,
    register,
    setValue,
    control,
    getValues,
    formOptions,
    partners,
    removePartner,
    addNewPartner,
    vestingCalendar,
    removeFromVestingCalendar,
    addNewToVestingCalendar,
    getMinDate,
    clearErrors,
  };
};
