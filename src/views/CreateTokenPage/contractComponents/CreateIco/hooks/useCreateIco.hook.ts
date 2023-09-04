import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';

import { ContractType } from '@cryptodo/contracts';
import { useEthers } from '@cryptodo/frontend-sdk';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedSelector } from '@/reduxStore';
import { FieldErrors } from '@/types';

import { createIcoTokenFormValidation } from '../CreateIcoToken.form.schema';
import { CreateIcoForm } from '../types/createIcoForm.interface';

const abi = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const useCreateIcoHook = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector(
    (state) => state.createToken[ContractType.icoContract].options
  );

  const [initialOwnerDisabled, toggleInitialOwner] = useState(true);
  const [decimals, setDecimals] = useState(18);

  const { account, library } = useEthers();

  const {
    register,
    setValue,
    clearErrors,
    setError,
    getValues,
    trigger,
    formState,
  } = useForm<CreateIcoForm>({
    resolver: yupResolver(createIcoTokenFormValidation),
    mode: 'onChange',
    shouldUnregister: true,
  });
  const { errors } = formState;

  useEffect(() => {
    if (account) {
      setValue('owner', account);
    }
  }, [account]);

  const handleSubmit = async (isTestnet: boolean) => {
    const contract = new Contract(getValues('token'), abi, library);
    let currentDecimals = 18;
    try {
      currentDecimals = await contract.decimals();
      setDecimals(currentDecimals);
    } catch (err) {
      setError('token', {
        message: { text: FieldErrors.wrongTokenContract } as any,
      });
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
    return {
      ...formData,
      price: utils.parseUnits(formData.price, decimals).toString(),
      maxPerWallet: utils
        .parseUnits(formData.maxPerWallet.toString(), decimals)
        .toString(),
      lockup: formData.lockup * 24 * 60 * 60,
      options: formOptions,
    };
  };

  return {
    getFormData,
    handleSubmit,
    errors,
    register,
    formOptions,
    clearErrors,
    initialOwnerDisabled,
    toggleInitialOwner,
  };
};
