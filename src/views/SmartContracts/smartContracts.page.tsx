import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useMedia } from 'react-use';

import { PlusIcon } from '@/assets/icons';
import { Space, Loader, Breadcrumbs } from '@/components';
import { useContractApi } from '@/hooks';
import { usePagination } from '@/hooks/usePagination/usePagination';
import { Pagination } from '@/components/molecules/Pagination/pagination.component';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleCreateTokenDialog } from '@/reduxStore/slices/ui/ui.slice';

import { filterContracts } from './utils';
import { Filters, NoSmartContracts, SmartContractCard } from './components';
import * as S from './smartContracts.page.style';

export const SmartContractsPage: FC = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const filters = useTypedSelector((state) => state.smartContracts.filters);
  
  const dispatch = useTypedDispatch();
  const { query } = useRouter();
  const { t } = useTranslation('SmartContracts');
  const isMobile = useMedia('(max-width: 769px)', false);

  const { getContracts } = useContractApi({ testnet: false });
  const { data: contracts, error } = getContracts();

  useEffect(() => {
    if (query.createContract) {
      dispatch(toggleCreateTokenDialog(true));
    }
  }, [query]);

  const contractsLoading = !contracts && !error && token;
  if (error) {
    return <div>Error</div>;
  }

  const filteredContracts = contracts
    ? filterContracts(filters, contracts)
    : [];

  const filteredSortContracts = filteredContracts.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );
  
  const openCreateTokenDialog = () => {
    dispatch(toggleCreateTokenDialog(true));
  }

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    gaps,
    totalPages,
  } = usePagination({
    contentPerPage: 10,
    count: filteredSortContracts.length,
  });

  useEffect(() => {
    if (filteredSortContracts.length !== 0) {
      setPage(1);
    }
  }, [filters]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const ContractsView = (
    <>
      {contracts && <Filters contracts={contracts} />}
      {filteredContracts.length > 0 ? (
        filteredSortContracts
          .slice(firstContentIndex, lastContentIndex)
          .map((contract) => (
            <SmartContractCard
              key={contract._id}
              contract={contract}
            />
          ))
      ) : (
        <NoSmartContracts />
      )}
    </>
  );

  return (
    <section>
      <Breadcrumbs routes={[{ label: 'main' }]} />
      <S.Header align="center" size={isMobile ? 'small' : 'large'}>
        <S.Title>{t('title')}</S.Title>
        <S.CreateButton
          onClick={openCreateTokenDialog}
          size={isMobile ? 'small' : 'large'}
        >
          <Space align="center">
            <PlusIcon />
            {t('createContract')}
          </Space>
        </S.CreateButton>
      </S.Header>
      {contractsLoading ? <Loader center /> : ContractsView}
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
        gaps={gaps}
        setPage={setPage}
        totalPages={totalPages}
      />
    </section>
  );
};
