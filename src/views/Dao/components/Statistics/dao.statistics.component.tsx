import { useMemo } from 'react';

import { useTypedSelector } from '@/reduxStore';

import { Info, InfoItem } from './components';
import * as S from './dao.statistics.component.style';

// const list: ListItem[] = [
//   {
//     Icon: VercelLogoIcon,
//     text: 'text',
//     to: 'https://debank.com/profile/0xe005f742dee564b81110b1f769f3979beb85957a?chain=matic',
//     id: 1,
//   },
//   {
//     Icon: VercelLogoIcon,
//     text: 'text',
//     to: 'https://debank.com/profile/0xe005f742dee564b81110b1f769f3979beb85957a?chain=matic',
//     id: 2,
//   },
//   {
//     Icon: VercelLogoIcon,
//     text: 'text',
//     to: 'https://debank.com/profile/0xe005f742dee564b81110b1f769f3979beb85957a?chain=matic',
//     id: 3,
//   },
//   {
//     Icon: VercelLogoIcon,
//     text: 'text',
//     to: 'https://debank.com/profile/0xe005f742dee564b81110b1f769f3979beb85957a?chain=matic',
//     id: 4,
//   },
// ];

export const Statistics = () => {
  const quorum = useTypedSelector((state) => state.dao.quorum);
  const partners = useTypedSelector((state) => state.dao.partners);

  const info: InfoItem[] = useMemo(
    () => [
      {
        Icon: '',
        title: 'QUORUM',
        color: 'rgb(115, 99, 248)',
        text: `${quorum}%`,
      },
      {
        Icon: '',
        title: 'MEMBERS',
        color: 'rgb(43, 161, 97)',
        text: partners.length.toString(),
      },
      {
        Icon: '',
        title: 'AUM',
        color: 'rgb(46, 123, 255)',
        text: '$0.00',
      },
    ],
    [quorum, partners]
  );

  return (
    <S.Container>
      {/* <S.Title>{t('statisticsTitle')}</S.Title> */}
      {/* <List content={list} /> */}
      <Info content={info} />
    </S.Container>
  );
};
