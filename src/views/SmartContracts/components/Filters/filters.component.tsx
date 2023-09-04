import { FC } from 'react';

import { ContractStatusesFilter } from '@/views/SmartContracts/components/Filters/ContractStatusesFilter/contractStatusesFilter';
import { TypeFilter } from '@/views/SmartContracts/components/Filters/TypeFilter/typeFilter';

import { NetworksList } from './NetworksList/networkList.component';
import { Search } from './Search/searchContract.component';

import { FiltersProps } from './filters.types';
import * as S from './filters.style';

export const Filters: FC<FiltersProps> = (props) => {
  const { contracts } = props;

  return (
    <S.Filters>
      <S.FiltersWrapper>
        <NetworksList contracts={contracts} />
        <ContractStatusesFilter contracts={contracts} />
        <TypeFilter contracts={contracts} />
      </S.FiltersWrapper>
      <Search />
    </S.Filters>
  );
};
