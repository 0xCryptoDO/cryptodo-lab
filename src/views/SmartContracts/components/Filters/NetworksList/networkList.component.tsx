import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Network } from '@cryptodo/contracts';

import { Select } from '@/components';
import { filterContracts } from '@/views/SmartContracts/utils/filterContracts';
import { networkTranslation } from '@/utils/constants';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { filterNetwork } from '@/views/SmartContracts/redux/smartContracts.slice';

import { NetworksListProps } from './networkList.types';
import * as S from './networkList.style';

export const NetworksList: FC<NetworksListProps> = ({ contracts }) => {
  const filters = useTypedSelector((state) => state.smartContracts.filters);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');

  const allContractsAmount = filterContracts(
    {
      ...filters,
      network: '',
    },
    contracts || []
  ).length;

  return (
    <S.Networks>
      <Select
        css={{ width: '100%', justifyContent: 'space-between' }}
        onChange={(standard) => {
          dispatch(filterNetwork(standard as Network | ''));
        }}
        items={[
          { label: `${t('networks.all')} ${allContractsAmount}`, value: '' },
          ...Object.entries(Network).map((entry) => {
            const [, network] = entry;
            const contractsAmount = filterContracts(
              {
                ...filters,
                network: network as Network,
              },
              contracts || []
            ).length;
            return {
              label: `${networkTranslation [network]} ${contractsAmount}`,
              value: network,
            };
          }),
        ]}
      />
    </S.Networks>
  );
};
