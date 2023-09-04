import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContractType } from '@cryptodo/contracts';

import { OpenCreateContractModal } from '@/views/CreateTokenPage/types/openCreateContractModal.type';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeErc20DefForm } from '@/views/CreateToken/redux/createToken.slice';
import {
  CreateErc20DefFormInterface
} from '@/views/CreateTokenPage/contractComponents/CreateErc20Def/types/createErc20DefForm.interface';

import { createDefTokenFormValidation } from '../createDefToken.form.schema';

export const useErc20DefHook = (handleOpenModal: OpenCreateContractModal) => {
  const formOptions = useTypedSelector((state) => state.createToken[ContractType.erc20DefContract].options);

  const dispatch = useTypedDispatch();
  const { register, control, clearErrors, setValue, getValues, trigger, formState } =
    useForm<CreateErc20DefFormInterface>({
      resolver: yupResolver(createDefTokenFormValidation),
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
    return { ...formData, options: formOptions };
  };

  const handleChangeMint = (event: any) => {
    clearErrors('options.mint.cap');
    dispatch(changeErc20DefForm({
      options: {
        ...formOptions,
        mint: {
          cap: (+event.target.value || '') as number,
        },
      },
    }));
  };

  const handleChangeRouter = (event: any) => {
    clearErrors('options.liquidity.router');
    dispatch(changeErc20DefForm({
      options: {
        ...formOptions,
        liquidity: {
          ...(formOptions.liquidity || { liquidityFee: 0 }),
          router: event.target.value,
        },
      },
    }));
  };

  const handleChangeLiquidity = (event: any) => {
    clearErrors('options.liquidity.liquidityFee');
    dispatch(changeErc20DefForm({
      options: {
        ...formOptions,
        liquidity: {
          ...(formOptions.liquidity || { router: '' }),
          liquidityFee: (+event.target.value || '') as number,
        },
      },
    }));
  };

  const handleChangeTeamFee = (event: any) => {
    clearErrors('options.team.teamFee');
    dispatch(changeErc20DefForm({
      options: {
        ...formOptions,
        team: {
          ...formOptions.team,
          teamFee: (+event.target.value || '') as number,
        },
      },
    }));
  };

  const handleChangeTeamWallet = (event: any) => {
    clearErrors('options.team.teamWallet');
    dispatch(changeErc20DefForm({
      options: {
        ...formOptions,
        team: {
          ...formOptions.team,
          teamWallet: event.target.value,
        },
      },
    }));
  };

  const handleChangeBurnFee = (event: any) => {
    clearErrors('options.taxBurn.burnFee');
    dispatch(changeErc20DefForm({
      options: {
        ...formOptions,
        taxBurn: {
          ...(formOptions.taxBurn || { router: '' }),
          burnFee: (+event.target.value || '') as number,
        },
      },
    }));
  };

  return {
    getFormData,
    handleSubmit,
    handleChangeMint,
    handleChangeRouter,
    handleChangeLiquidity,
    handleChangeTeamFee,
    handleChangeTeamWallet,
    handleChangeBurnFee,
    errors,
    register,
    setValue,
    trigger,
    getValues,
    formOptions,
    clearErrors,
    control,
  };
};
