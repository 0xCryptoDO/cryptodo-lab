import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { useEthers } from '@cryptodo/frontend-sdk';
import { ContractType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedSelector } from '@/reduxStore';

import { createDaoTokenFormValidation } from '../createDao.page.schema';
import { CreateDaoForm } from '../types/createDaoForm.interface';

export const useDao = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector((state) => state.createToken[ContractType.daoContract].options);

  const { register, setValue, getValues, trigger, formState, watch, control } =
    useForm<CreateDaoForm>({
      resolver: yupResolver(createDaoTokenFormValidation),
      mode: 'onChange',
      shouldUnregister: true,
    });
  const { errors } = formState;

  const [quorum, setQuorum] = useState(50);

  const { fields: partners, append: appendPartner, remove: removePartner } = useFieldArray({
    control,
    name: 'partners',
  });

  const { account } = useEthers();

  const addNewPartner = () => {
    const partner = {
      partnerAddress: '',
      GTAmount: 1,
    };
    appendPartner(partner);
  };

  useEffect(() => {
    setValue('quorum', quorum);
  }, [quorum]);

  useEffect(() => {
    appendPartner({ partnerAddress: account || '', GTAmount: 1 });
  }, []);

  const handleSubmit = async (isTestnet: boolean) => {
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    handleOpenModal(isTestnet);
  };

  const getFormData = () => {
    const formData = getValues();
    const shares = formData.partners.map((el) => el.GTAmount);
    const partners = formData.partners.map((el) => el.partnerAddress);
    return {
      name: formData.name,
      quorum: formData.quorum,
      shares,
      partners,
      symbol: formData.symbol,
      contractName: formData.name,
      options: formOptions,
    };
  };

  return {
    getFormData,
    handleSubmit,
    errors,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    watch,
    partners,
    addNewPartner,
    removePartner,
    quorum,
    setQuorum,
  };
};
