import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { ContractType } from '@cryptodo/contracts';
import { Network } from '@cryptodo/contracts/lib/constants';

import { Breadcrumbs, PaySumDialog } from '@/components';
import { useContractApi } from '@/hooks';
import { networkTranslation } from '@/utils/constants';
import {
  CreateAirDrop,
  CreateDao,
  CreateErc20,
  CreateErc20Def,
  CreateErc721,
  CreateIco,
  CreateLottery,
  CreateMultisig,
  CreateVesting,
} from '@/views/CreateTokenPage/contractComponents';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import {
  setChangeAllFieldDisabledFunction,
  setContractNetwork,
  setContractType,
} from '@/reduxStore/slices/contracts/contracts.slice';
import { toggleCreateTokenDialog } from '@/reduxStore/slices/ui/ui.slice';
import { reset } from '@/views/CreateToken/redux/createToken.slice';
import { CreateStaking } from '@/views/CreateTokenPage/contractComponents/CreateStaking/createStaking.component';

import * as S from './createToken.page.style';

export const CreateTokenPage: FC = () => {
  const {
    push,
    query: { type, network },
  } = useRouter();
  
  const options = useTypedSelector((state) => state.createToken[type as ContractType]?.options);
  
  const { t } = useTranslation('common');
  const dispatch = useTypedDispatch();

  const [allFieldsDisabled, setAllFieldsDisabled] = useState(false);
  const [deployConfirmationOpen, toggleDeployConfirmationDialog] =
    useState(false);
  const [paySumOpen, togglePaySumDialog] = useState(false);
  const [postingToTestnet, setPostingToTestnet] = useState(false);

  const onError = () => {
    setPostingToTestnet(true);
  };

  const onSuccess = () => {
    dispatch(reset());
    push('/');
  };

  const { submit, confirm, approve, approveLoading, approvedAmount } =
    useContractApi({
      testnet: postingToTestnet,
      onError,
      onSuccess,
      disableAllFields: setAllFieldsDisabled,
      togglePaySumDialog,
    });

  const handleOpenModal = async (isTestnet: boolean) => {
    setPostingToTestnet(isTestnet);
    if (toggleDeployConfirmationDialog) {
      toggleDeployConfirmationDialog(true);
    } else if (isTestnet && submit) {
      await submit(undefined, isTestnet);
    } else if (togglePaySumDialog) {
      togglePaySumDialog(true);
    }
  };
  
  useEffect(() => {
    dispatch(setChangeAllFieldDisabledFunction(setAllFieldsDisabled));
  }, [setAllFieldsDisabled])

  useEffect(() => {
    if (type && Object.values(ContractType).includes(type as ContractType)) {
      dispatch(setContractType(type as ContractType));
    }
    setAllFieldsDisabled(false);
    dispatch(reset());
  }, [type]);

  useEffect(() => {
    if (network) {
      dispatch(setContractNetwork(network as Network));
    }
    setAllFieldsDisabled(false);
  }, [network]);

  const getContract = () => {
    switch (type) {
      case ContractType.icoContract:
        return (
          <CreateIco
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.daoContract:
        return (
          <CreateDao
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.lotteryContract:
        return (
          <CreateLottery
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.vestingContract:
        return (
          <CreateVesting
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.erc721Contract:
        return (
          <CreateErc721
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.erc20DefContract:
        return (
          <CreateErc20Def
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.multisigContract:
        return (
          <CreateMultisig
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.airDropContract:
        return (
          <CreateAirDrop
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      case ContractType.stakingContract:
        return (
          <CreateStaking
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
      default:
        return (
          <CreateErc20
            nameContract={t(`contractDescription.${type}`)}
            allFieldsDisabled={allFieldsDisabled}
            handleOpenModal={handleOpenModal}
            deployConfirmationOpen={deployConfirmationOpen}
            toggleDeployConfirmationDialog={toggleDeployConfirmationDialog}
            confirm={confirm}
            isTestnet={postingToTestnet}
          />
        );
    }
  };

  return (
    <S.FormWrapper>
      <Breadcrumbs
        routes={[
          { label: 'main', link: '/' },
          {
            label: 'createContract',
            link: '',
            onClick: () => dispatch(toggleCreateTokenDialog(true)),
          },
          {
            label: t(`contractDescription.${type}`),
            disabled: true,
            noTranslation: true,
          },
          {
            label: `(${networkTranslation[network as Network]})`,
            disabled: true,
            noTranslation: true,
          },
        ]}
      />
      <S.Wrapper>
        <PaySumDialog
          open={paySumOpen}
          onClose={() => {
            setPostingToTestnet(true);
            togglePaySumDialog(false);
          }}
          toggle={togglePaySumDialog}
          testnet={postingToTestnet}
          submit={submit}
          options={options}
          approve={approve}
          approvedAmount={approvedAmount}
          approveLoading={approveLoading}
          type={type as ContractType}
        />
        {getContract()}
      </S.Wrapper>
    </S.FormWrapper>
  );
};
