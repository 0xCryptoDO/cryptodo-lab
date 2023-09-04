import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { ContractType } from '@cryptodo/contracts';

import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { Select } from '@/components';
import { TypeFilterTypes } from '@/views/SmartContracts/components/Filters/TypeFilter/typeFilter.types';
import { filterContracts } from '@/views/SmartContracts/utils';
import { filterType } from '@/views/SmartContracts/redux/smartContracts.slice';

export const TypeFilter: FC<TypeFilterTypes> = ({ contracts }) => {
  const filters = useTypedSelector((state) => state.smartContracts.filters);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');

  const allContractsAmount = filterContracts(
    {
      ...filters,
      type: '',
    },
    contracts || []
  ).length;

  return (
    <Select
      css={{ width: '100%', justifyContent: 'space-between' }}
      items={[
        { label: `${t('contractTypes.all')} ${allContractsAmount}`, value: '' },
        ...Object.entries(ContractType).map((entry) => {
          const [, type] = entry;

          const contractsAmount = filterContracts(
            {
              ...filters,
              type: type as ContractType,
            },
            contracts || []
          ).length;

          return {
            label: `${t(`contractTypes.${type}`)} ${contractsAmount}`,
            value: type,
          };
        }),
      ]}
      onChange={(standard) => {
        dispatch(filterType(standard as ContractType));
      }}
    />
  );
};
