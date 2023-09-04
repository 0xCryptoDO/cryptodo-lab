import { FC, useState } from 'react';
import { useMedia } from 'react-use';

import { ContractStatus } from '@cryptodo/contracts';

import { useBillingApi, useContractApi } from '@/hooks';
import { DeployConfirmation, PaySumDialog } from '@/components';
import { useTypedDispatch } from '@/reduxStore';
import { setContractNetwork } from '@/reduxStore/slices/contracts/contracts.slice';

import { SmartContractCardDesktop, SmartContractCardMobile } from './media';
import { SmartContractCardProps } from './smartContract.card.types';

export const SmartContractCard: FC<SmartContractCardProps> = ({ contract }) => {
  const { _id, options, testnet, type, network, status } = contract;

  const [deployConfirmationOpen, toggleDeployConfirmationDialog] =
    useState(false);
  const [paySumOpen, togglePaySumDialog] = useState(false);
  // when contract is deployed to testnet, all dialogs should be configured for mainnet
  const isTestnet = status === ContractStatus.deployed ? false : testnet;

  const dispatch = useTypedDispatch();
  const isDesktop = useMedia('(min-width: 769px)', false);
  const { check } = useBillingApi();

  const { pay, deploy, approve, approvedAmount, approveLoading } =
    useContractApi({
      testnet: isTestnet,
      network,
      type,
      initialData: {
        id: _id,
      },
    });

  const openPaySumDialog = async () => {
    const isContractPaid = await check(_id);
    if (isContractPaid) {
      dispatch(setContractNetwork(network));
      deploy(_id, isTestnet);
    } else {
      togglePaySumDialog(true);
    }
  };

  return (
    <>
      <PaySumDialog
        open={paySumOpen}
        toggle={togglePaySumDialog}
        testnet={isTestnet}
        submit={pay}
        options={options}
        approve={approve}
        approvedAmount={approvedAmount}
        approveLoading={approveLoading}
        type={type}
        id={_id}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => deploy(undefined, isTestnet)}
      />
      {isDesktop ? (
        <SmartContractCardDesktop
          contract={contract}
          pay={openPaySumDialog}
          deploy={(id?: string) => deploy(id, isTestnet)}
        />
      ) : (
        <SmartContractCardMobile
          contract={contract}
          pay={openPaySumDialog}
          deploy={(id?: string) => deploy(id, isTestnet)}
        />
      )}
    </>
  );
};
