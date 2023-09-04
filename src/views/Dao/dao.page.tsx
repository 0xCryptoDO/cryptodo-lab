import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';
import { useEthers } from '@usedapp/core';

import { shortenIfAddress } from '@cryptodo/frontend-sdk';

import { Breadcrumbs, CopyField } from '@/components';
import { CONTRACT_ABI } from '@/config';
import { calcPercent } from '@/utils/computedGT';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import {
  DaoExtendedPartner,
  setActiveTab,
  setAddress,
  setName,
  setPartners,
  setQuorum,
} from '@/views/Dao/redux/dao.slice';

import * as S from './dao.page.style';
import { Members, Statistics, Tabs, Voting } from './components';

export const DaoPage: FC = () => {
  const { address, activeTab, name } = useTypedSelector((state) => state.dao);

  const dispatch = useTypedDispatch();
  const { query } = useRouter();
  const { library } = useEthers();

  useEffect(() => {
    if (query.address && library) {
      const address =
        typeof query.address === 'string'
          ? query.address
          : query.address.join('');

      const contract = new Contract(address, CONTRACT_ABI, library);

      dispatch(setAddress(address));
      contract.quorum().then((res: number) => dispatch(setQuorum(res)));
      contract.name().then((res: string) => dispatch(setName(res)));
      contract.getPartners().then((addresses: string[]) => {
        contract.getShares().then((shares: BigNumber[]) => {
          const formattedShares = shares.map((share) => share.toNumber());
          const allShares = formattedShares.reduce(
            (prev, current) => prev + current,
            0
          );

          const partners: DaoExtendedPartner[] = addresses.map(
            (address, index) => ({
              address,
              shares: formattedShares[index],
              percents: +(calcPercent(allShares, formattedShares[index]) || 0),
            })
          );

          dispatch(setPartners(partners));
        });
      });
    }
  }, [query, library]);

  return (
    <S.Container>
      <Breadcrumbs
        routes={[
          { label: 'main', link: '/' },
          { label: shortenIfAddress(address), noTranslation: true },
        ]}
      />

      <S.Flex>
        <div style={{ width: '100%' }}>
          <S.Title>{name}</S.Title>
          <CopyField
            content={address}
            childrenCSS={{
              paddingLeft: 0,
              borderLeft: 'none',
            }}
            css={{
              width: '450px',
              background: 'transparent',
              border: 'none',
              '@fromPhone': {
                width: '100%',
              },
            }}
          />
          <Statistics />
          <Tabs
            activeTab={activeTab}
            setActiveTab={(value: number) => setActiveTab(value)}
          />
        </div>
        {activeTab === 1 && <Members />}
        {activeTab === 2 && <Voting />}
      </S.Flex>
    </S.Container>
  );
};
