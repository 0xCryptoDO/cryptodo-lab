import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { parseEther } from 'ethers/lib/utils';
import { providers } from 'ethers';
import useTranslation from 'next-translate/useTranslation';
import { TransactionRequest } from '@ethersproject/abstract-provider';

import { useContractWeb3, useEthers } from '@cryptodo/frontend-sdk';
import {
  ContractType,
  Currencies,
  Net,
  Network,
  networkCurrencies,
  NETWORKS_WITH_DISABLED_PAYMENTS,
  rpcUrls,
} from '@cryptodo/contracts';

import { getContractsApi, urls } from '@/api/contracts';
import {
  Step as ContractStatusStep,
  Step,
} from '@/components/molecules/ContractStatus/contractStatus.types';
import { useBillingApi, useUsersApi } from '@/hooks';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { compileContract } from '@/utils/compile';
import { checkIfVerificationEnabled } from '@/utils/checkIfVerificationEnabled';
import { setRetryFunction } from '@/reduxStore/slices/contracts/contracts.slice';
import {
  toggleContractCreatedDialog,
  toggleContractStatusDialog,
  toggleLoading,
} from '@/reduxStore/slices/ui/ui.slice';

import { ContractInterimData, UseContractProps } from './types';
import { useAiApi } from '../useAiApi';

const DEFAULT_CONTRACT_INTERIM = {
  id: '',
  txId: '',
  payableAmount: '',
};

export const useContractApi = (params: UseContractProps) => {
  const {
    onError,
    onSuccess,
    initialData,
    disableAllFields,
    togglePaySumDialog,
    testnet,
    network,
    type,
  } = params;

  const currentStep = useTypedSelector(
    (state) => state.ui.contractStatusDialog.step
  );
  const { network: paymentNetwork, currency: paymentCurrency } =
    useTypedSelector((state) => state.contracts.payment);
  const token = useTypedSelector((state) => state.auth.token);
  const { contractType: localContractType, network: localSelectedBlockchain } =
    useTypedSelector((state) => state.contracts.createToken);

  const [sendActivated, activateSend] = useState(false);
  const [sendTriggered, triggerSend] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { newTx, verifyTx } = useBillingApi();
  const { getCurrentUser } = useUsersApi();
  const { getCodeByPrompt, assembleCode, getCodeByMessages } = useAiApi();
  const {
    getDeployInfo,
    getContracts,
    verifyContract,
    createContract,
    updateAbi,
    updateSourceCode,
  } = getContractsApi();
  const { t } = useTranslation('common');

  const selectedContractType = type || localContractType;
  const selectedBlockchain = network || localSelectedBlockchain;

  const { account, chainId } = useEthers();

  const { approvement, deployment, payment } = useContractWeb3({
    paymentCurrency,
    paymentNetwork,
    contractNetwork: selectedBlockchain,
    testnet,
  });

  const [contractInterim, setContractInterim] = useState<ContractInterimData>(
    initialData
      ? {
          ...DEFAULT_CONTRACT_INTERIM,
          ...initialData,
        }
      : DEFAULT_CONTRACT_INTERIM
  );
  const { id, txId, payableAmount } = contractInterim;

  const changeContractInterim = (data: Partial<ContractInterimData>) => {
    setContractInterim((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const secureContractInteraction =
    <Arg = undefined, Arg2 = undefined, ReturnType = undefined>(
      fn: (arg1?: Arg, arg2?: Arg2) => Promise<ReturnType | void>
    ): ((arg?: Arg, arg2?: Arg2) => Promise<ReturnType | void>) =>
    async (arg1, arg2) => {
      try {
        return await fn(arg1, arg2);
      } catch (err) {
        if (disableAllFields) {
          disableAllFields(false);
        }
        if ((err as Error).name === 'rejectNetwork') {
          dispatch(
            toggleContractStatusDialog({
              step: ContractStatusStep.rejectNetwork,
            })
          );
        } else if (currentStep === Step.compilation || !currentStep) {
          changeContractInterim({ id: '' });
          toast.error((err as Error).message);
          if (disableAllFields) {
            disableAllFields(false);
          }
          dispatch(
            toggleContractStatusDialog({
              is: true,
              errorMessage: (err as Error).message,
            })
          );
        } else {
          dispatch(
            toggleContractStatusDialog({
              is: true,
              errorMessage: (err as Error).message,
            })
          );
        }
        if (onError) {
          onError();
        }
        return undefined;
      }
    };

  const compile = secureContractInteraction(
    async (form: any, isTestnet?: boolean): Promise<string> => {
      const aiEnabled = form.options?.aiFunction !== undefined;

      dispatch(
        toggleContractStatusDialog({
          is: !!isTestnet,
          step: ContractStatusStep.compilation,
          testnet: isTestnet,
          aiEnabled,
        })
      );

      if (!form) {
        throw new Error(
          'Provide `form` argument when compiling a contract [`useContract` hook]'
        );
      }

      if (!account) {
        throw new Error('`account` is not detected [`useContract` hook]');
      }

      const params = {
        ...form,
        network: selectedBlockchain,
        testnet: isTestnet,
      };

      let contractId = id;
      if (!contractId) {
        const newContractId = await createContract(
          params,
          selectedContractType
        );
        contractId = newContractId;
        changeContractInterim({
          id: newContractId,
        });
      }
      return contractId;
    }
  );

  const deploy = async (contractId?: string, isTestnet?: boolean) => {
    const currentTestnet = isTestnet === undefined ? testnet : isTestnet;
    dispatch(
      toggleContractStatusDialog({
        is: true,
        step: ContractStatusStep.compilation,
        testnet: currentTestnet,
        aiFunctionStatus: undefined,
      })
    );
    if (contractId || id) {
      const deployInfo = await getDeployInfo({
        contractId: contractId || id,
        testnet: currentTestnet,
        contractType: selectedContractType,
      });
      const aiEnabled = deployInfo.options?.aiFunction !== undefined;

      let data: any;
      let abi: any;

      if (aiEnabled) {
        dispatch(
          toggleContractStatusDialog({
            is: true,
            step: ContractStatusStep.aiGeneration,
            testnet: isTestnet,
            aiEnabled,
          })
        );
        try {
          const prompt = `${deployInfo.aiSourceCode} ${deployInfo.options?.aiFunction}`;

          let res = await getCodeByPrompt({
            promt: prompt,
          });

          const code = res.message;
          const isCodeSmallerThanSource =
            code.length < deployInfo.aiSourceCode!.length * 0.9;

          if (isCodeSmallerThanSource) {
            const messages = [
              {
                role: 'user',
                name: 'ai',
                content: prompt,
              },
              {
                role: 'assistant',
                name: 'ai',
                content: res.message,
              },
              {
                role: 'user',
                name: 'ai',
                content: 'Write full contract',
              },
            ];

            res = await getCodeByMessages({
              messages,
            });
          }

          const res2 = await assembleCode({
            generatedResponseId: res.generatedRespinseId,
          });
          const compileRes = await compileContract({
            ...deployInfo,
            sourceCode: atob(res2.assembleCode),
            network: selectedBlockchain,
            testnet: currentTestnet,
          });
          data = compileRes.data;
          abi = compileRes.abi;
          await updateSourceCode({
            contractId: contractId || id,
            contractType: selectedContractType,
            sourceCode: atob(res2.assembleCode),
          });
          dispatch(
            toggleContractStatusDialog({
              aiFunctionStatus: true,
            })
          );
        } catch (err) {
          dispatch(
            toggleContractStatusDialog({
              aiFunctionStatus: false,
            })
          );
          const compileRes = await compileContract({
            ...deployInfo,
            network: selectedBlockchain,
            testnet: currentTestnet,
          });
          data = compileRes.data;
          abi = compileRes.abi;
        }
      } else {
        const compileRes = await compileContract({
          ...deployInfo,
          network: selectedBlockchain,
          testnet: currentTestnet,
        });
        data = compileRes.data;
        abi = compileRes.abi;
      }

      dispatch(
        toggleContractStatusDialog({
          is: true,
          step: ContractStatusStep.deploy,
          testnet: currentTestnet,
          aiEnabled,
        })
      );
      await updateAbi({
        abi: JSON.stringify(abi),
        contractId: contractId || id,
        contractType: selectedContractType,
      });
      const transactionParams: TransactionRequest = { data };
      if (params.value || params.value === 0) {
        transactionParams.value = parseEther(params.value.toString());
      }
      if (selectedBlockchain === Network.lightlink) {
        const net: Net = currentTestnet ? 'testnet' : 'mainnet';
        const provider = new providers.JsonRpcProvider(
          rpcUrls[Network.lightlink][net]
        );
        if (selectedContractType === ContractType.daoContract) {
          transactionParams.gasLimit = 4500000;
        } else {
          const response = await provider.estimateGas({
            data,
          });
          transactionParams.gasLimit = Math.ceil(response.toNumber() * 1.2);
        }
      }
      await deployment.sendTransaction(transactionParams);
      if (contractId) {
        changeContractInterim({
          id: contractId,
        });
      }
    }
  };

  const pay = secureContractInteraction<string, void>(
    async (contractId?: string) => {
      dispatch(
        toggleContractStatusDialog({
          is: false,
          testnet: false,
        })
      );
      dispatch(
        toggleLoading({
          is: true,
          message: t('common:signingMessage'),
        })
      );
      const { _id: newTxId, payableAmount } = await newTx(
        selectedContractType,
        {
          currency: paymentCurrency,
          contractId: contractId || id,
          network: paymentNetwork,
        }
      );

      changeContractInterim({
        txId: newTxId,
        payableAmount: payableAmount.toString(),
        id: contractId || id,
      });
      activateSend(true);
      triggerSend(true);
    }
  );

  const handleApprove = async (amount: number) => {
    setApproveLoading(true);
    try {
      await approvement.sendTransaction(
        (Math.round(amount * 100) / 100).toString()
      );
    } catch (err) {
      dispatch(
        toggleLoading({
          is: false,
          message: undefined,
        })
      );
      toast.error((err as Error).message);
      if (onError) {
        onError();
      }
    }
  };

  const sendPaymentTx = async () => {
    activateSend(false);
    triggerSend(false);
    try {
      const user = await getCurrentUser();
      let formattedPayableAmount = payableAmount;
      if (networkCurrencies[selectedBlockchain][paymentCurrency]?.decimals) {
        const decimals =
          networkCurrencies[selectedBlockchain][paymentCurrency]?.decimals || 0;
        formattedPayableAmount = (
          Math.round(+payableAmount * 10 ** decimals) /
          10 ** decimals
        ).toString();
      }

      await payment.sendTransaction(
        formattedPayableAmount,
        user.referralWallet
      );
    } catch (err) {
      dispatch(
        toggleLoading({
          is: false,
          message: undefined,
        })
      );
      toast.error((err as Error).message);
      if (onError) {
        onError();
      }
    }
  };
  const handleVerifyTx = async () => {
    try {
      const hash = payment.state.transaction?.hash;
      if (hash) {
        await verifyTx({
          transactionId: txId,
          hash,
        });
        dispatch(
          toggleLoading({
            is: false,
            message: undefined,
          })
        );
        dispatch(setRetryFunction(deploy));
        await deploy(undefined, testnet);
      }
    } catch (err) {
      dispatch(
        toggleLoading({
          is: false,
          message: undefined,
        })
      );
      if (onError) {
        onError();
      }
    }
  };

  const handleVerifyContract = async () => {
    if (checkIfVerificationEnabled(testnet, selectedBlockchain)) {
      dispatch(
        toggleContractStatusDialog({
          step: ContractStatusStep.verification,
        })
      );

      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve: Function) => setTimeout(resolve, 15000));
    }
    const hash = deployment.state.transaction?.hash;
    if (hash) {
      try {
        await verifyContract(selectedContractType, {
          contractId: id,
          hash,
        });
        dispatch(
          toggleContractStatusDialog({
            is: false,
            step: undefined,
            testnet: undefined,
          })
        );
        dispatch(toggleContractCreatedDialog(true));

        if (onSuccess) {
          onSuccess();
        }
        router.push('/');
      } catch (err) {
        dispatch(
          toggleContractStatusDialog({
            errorMessage:
              (err as Error).message ||
              'Error happening while verifying contract. Contract is deployed but not verified',
          })
        );
      }
    }
  };

  const useGetContractsApi = () =>
    useSWR(token ? [urls.GET_CONTRACTS, token] : null, () => getContracts(), {
      shouldRetryOnError: false,
    });

  useEffect(() => {
    changeContractInterim(DEFAULT_CONTRACT_INTERIM);
  }, [selectedBlockchain]);

  useEffect(() => {
    if (sendActivated) {
      sendPaymentTx();
    }
  }, [sendTriggered, chainId]);
  useEffect(() => {
    if (payment.state) {
      switch (payment.state.status) {
        case 'Exception':
        case 'Fail': {
          dispatch(
            toggleLoading({
              is: false,
              message: undefined,
            })
          );
          if (payment.state.errorMessage?.includes('insufficient funds')) {
            toast.error(t('common:errors.insufficientFunds') as string);
          } else {
            toast.error(payment.state.errorMessage);
          }
          if (onError) {
            onError();
          }
          // TODO check
          break;
        }
        case 'Mining': {
          dispatch(
            toggleLoading({
              message: t('common:txPending'),
            })
          );
          break;
        }
        case 'Success': {
          handleVerifyTx();
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [payment.state]);
  useEffect(() => {
    if (deployment.state) {
      switch (deployment.state.status) {
        case 'Exception':
        case 'Fail': {
          if (onError) {
            onError();
          }
          dispatch(
            toggleContractStatusDialog({
              step: ContractStatusStep.error,
              errorMessage: deployment.state.errorMessage,
            })
          );
          break;
        }
        case 'Success': {
          dispatch(setRetryFunction(handleVerifyContract));
          handleVerifyContract();
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [deployment.state]);

  useEffect(() => {
    if (approvement.state) {
      switch (approvement.state.status) {
        case 'PendingSignature': {
          setApproveLoading(true);
          break;
        }
        case 'Mining': {
          setApproveLoading(true);
          break;
        }
        case 'Exception': {
          setApproveLoading(false);
          break;
        }
        case 'Success': {
          setApproveLoading(false);
          break;
        }
        default: {
          setApproveLoading(false);
          break;
        }
      }
    }
  }, [approvement.state]);

  const submit = async (contractId?: string, isTestnet?: boolean) => {
    if (
      !isTestnet &&
      !NETWORKS_WITH_DISABLED_PAYMENTS.includes(selectedBlockchain)
    ) {
      await pay(contractId);
    } else {
      await deploy(contractId, isTestnet);
    }
  };

  const confirm = async (form: any, isTestnet?: boolean) => {
    if (disableAllFields) {
      disableAllFields(true);
    }
    const contractId = await compile(form, isTestnet);

    if (
      !isTestnet &&
      !NETWORKS_WITH_DISABLED_PAYMENTS.includes(selectedBlockchain)
    ) {
      if (contractId && togglePaySumDialog) {
        togglePaySumDialog(true);
      }
    } else if (contractId) {
      dispatch(setRetryFunction(() => submit(contractId, isTestnet)));
      await submit(contractId, isTestnet);
    }
  };

  return {
    getContracts: useGetContractsApi,
    deploy: (contractId?: string, isTestnet?: boolean) => {
      dispatch(setRetryFunction(() => deploy(contractId, isTestnet)));
      return deploy(contractId, isTestnet);
    },
    pay: (contractId?: string) => {
      dispatch(setRetryFunction(() => pay(contractId)));
      return pay(contractId);
    },
    submit: (contractId?: string, isTestnet?: boolean) => {
      dispatch(setRetryFunction(() => submit(contractId, isTestnet)));
      return submit(contractId, isTestnet);
    },
    confirm: async (form: any, isTestnet?: boolean) => {
      dispatch(setRetryFunction(() => confirm(form, isTestnet)));
      return confirm(form, isTestnet);
    },
    approvedAmount: approvement.approvedAmount,
    approve: handleApprove,
    approveLoading:
      approveLoading ||
      ([Currencies.busd, Currencies.cdo].includes(paymentCurrency) &&
        !approvement.approvedAmount &&
        !approvement.error &&
        approvement.state.status !== 'None'),
  };
};
