import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContractType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedSelector } from '@/reduxStore';

import { createMultisigTokenFormValidation } from '../createMultisig.schema';
import {
  CreateMultisigForm
} from '../types/createMultisigForm.interface';

export const useCreateMultisig = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector((state) => state.createToken[ContractType.multisigContract].options);

  const {
    register,
    setValue,
    control,
    getValues,
    trigger,
    formState,
    setError,
    clearErrors,
  } = useForm<CreateMultisigForm>({
    resolver: yupResolver(createMultisigTokenFormValidation) as any,
    mode: 'onChange',
    shouldUnregister: true,
  });
  const { errors } = formState;

  const handleSubmit = async (isTestnet: boolean) => {
    setValue('options', formOptions);
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    handleOpenModal(isTestnet);
  };

  const getFormData = () => {
    const formData = getValues();
    const owners = formData.owners.map((el) => el.owner);
    const weights = formData.owners.map((el) => el.weight);
    return { ...formData, owners, weights, options: formOptions };
  };

  return {
    getFormData,
    handleSubmit,
    errors,
    control,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    setError,
    clearErrors,
  };
};
