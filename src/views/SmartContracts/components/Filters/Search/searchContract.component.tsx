import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Input } from '@/components';
import { SearchIcon } from '@/assets/icons';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { search } from '@/views/SmartContracts/redux/smartContracts.slice';

import * as S from './searchContract.style';

export const Search: FC = () => {
  const filters = useTypedSelector((state) => state.smartContracts.filters);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');

  return (
    <S.Search>
      <Input
        placeholder={t('common:search')}
        addonAfter={<SearchIcon />}
        value={filters.search}
        onChange={({ target: { value: query } }) => {
          dispatch(search(query as string));
        }}
      />
    </S.Search>
  );
};
