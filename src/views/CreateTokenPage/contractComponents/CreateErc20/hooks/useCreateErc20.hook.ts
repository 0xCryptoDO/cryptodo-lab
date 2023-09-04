import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContractType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeErc20Form } from '@/views/CreateToken/redux/createToken.slice';

import { createTokenFormValidation } from '../createToken.form.schema';
import { Erc20Form } from '../types/erc20Form.interface';

export const useCreateErc20Hook = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector((state) => state.createToken[ContractType.erc20Contract].options);

  const dispatch = useTypedDispatch();
  const { register, clearErrors, setValue, getValues, trigger, formState } =
    useForm<Erc20Form>({
      resolver: yupResolver(createTokenFormValidation),
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
    
    return { ...formData, totalSupply: String(formData.totalSupply) };
  };
  
  const handleChangeMint = (event: any) => {
    clearErrors('options.mint.cap');
    dispatch(changeErc20Form({
      options: {
        ...formOptions,
        mint: {
          cap: +event.target.value,
        },
      }
    }));
  }

  return {
    getFormData,
    handleSubmit,
    handleChangeMint,
    errors,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    clearErrors,
  };
};
