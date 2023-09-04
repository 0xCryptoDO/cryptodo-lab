import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { ContractStatus, TransactionStatus } from '@cryptodo/contracts';

import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { filterStatus } from '@/views/SmartContracts/redux/smartContracts.slice';
import { Select } from '@/components';
import {
  ContractStatusesFilterTypes,
} from '@/views/SmartContracts/components/Filters/ContractStatusesFilter/contractStatusesFilter.types';
import { filterContracts } from '@/views/SmartContracts/utils';

import * as S from './contractStatusesFilter.style';

export const ContractStatusesFilter: FC<ContractStatusesFilterTypes> = ({ contracts }) => {
  const filters = useTypedSelector((state) => state.smartContracts.filters);
  
  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');

  const allContractsAmount = filterContracts(
    {
      ...filters,
      status: '',
    },
    contracts || [],
  ).length;

  const getStatusTranslation = (status: ContractStatus | TransactionStatus.waitingForPayment) => {
    switch (status) {
      case ContractStatus.waitingForDeployment:
        return 'waitingForDeploy';
      case ContractStatus.deployed:
        return 'deployed';
      default:
        return 'waitingForPayment';
    }
  };

  return (
    <S.Statuses>
      <Select
        css={{ width: '100%', justifyContent: 'space-between' }}
        onChange={(standard) => {
          dispatch(filterStatus(standard as ContractStatus | ''));
        }}
        items={[
          { label: `${t('statuses.all')} ${allContractsAmount}`, value: '' },
          {
            label: `${t(`statuses.${getStatusTranslation( TransactionStatus.waitingForPayment)}`)} ${filterContracts(
              {
                ...filters,
                status:  TransactionStatus.waitingForPayment,
              },
              contracts || [],
            ).length}`,
            value:  TransactionStatus.waitingForPayment,
          },
          ...Object.entries(ContractStatus).map((entry) => {
            const [, status] = entry;
            const contractsAmount = filterContracts(
              {
                ...filters,
                status: status as ContractStatus,
              },
              contracts || [],
            ).length;
            return {
              label: `${t(`statuses.${getStatusTranslation(status)}`)} ${contractsAmount}`,
              value: status,
            };
          }),
        ]}
      />
    </S.Statuses>
  );
};
