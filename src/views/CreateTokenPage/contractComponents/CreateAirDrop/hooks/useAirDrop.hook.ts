import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';

import { AirDropType, ContractType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeAirDropForm } from '@/views/CreateToken/redux/createToken.slice';

import { createAirDropTokenFormValidation } from '../createAirDropToken.form.schema';
import { CreateAirDropForm } from '../types/createAirDropForm.interface';

export const useAirDrop = (handleOpenModal: OpenCreateContractModal) => {
  const airDropType = useTypedSelector((state) => state.createToken[ContractType.airDropContract].airDropType);
  const formOptions = useTypedSelector((state) => state.createToken[ContractType.airDropContract].options);
  
  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  const { register, setValue, clearErrors, getValues, trigger, formState } =
    useForm<CreateAirDropForm>({
      resolver: yupResolver(createAirDropTokenFormValidation),
      mode: 'onChange',
      shouldUnregister: true,
    });
  const { errors } = formState;

  const handleSubmit = async (isTestnet: boolean) => {
    const isTypePicked = airDropType !== null;

    if (!isTypePicked) {
      toast.error(t('noAirDropType') as string);
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
    return { ...formData, airDropType, options: formOptions };
  };

  const changeAirDropType = (payload: AirDropType) => {
    dispatch(changeAirDropForm({ airDropType: payload }));
  };

  return {
    getFormData,
    handleSubmit,
    changeAirDropType,
    errors,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    airDropType,
    clearErrors,
  };
};
