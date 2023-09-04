import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContractType } from '@cryptodo/contracts';

import { useTypedSelector } from '@/reduxStore';
import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';

import { createERC721TokenFormValidation } from '../createErc721Token.form.schema';
import { CreateErc721Form } from '../types/createErc721Form.interface';

export const useCreateErc721 = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector(
    (state) => state.createToken[ContractType.erc721Contract].options
  );

  const { register, clearErrors, setValue, getValues, trigger, formState, control } =
    useForm<CreateErc721Form>({
      resolver: yupResolver(createERC721TokenFormValidation),
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
    return {
      ...formData,
      totalSupply: String(formData.totalSupply),
      timeForReveal: new Date(formData.timeForReveal).getTime(),
      options: formOptions,
    };
  };

  const getErrorMessage = () => {
    if ((errors?.timeForReveal?.message as any)?.text) {
      return `${(errors!.timeForReveal!.message as any).text}`;
    }

    return null;
  };

  return {
    getFormData,
    handleSubmit,
    getErrorMessage,
    errors,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    control,
    clearErrors,
  };
};
