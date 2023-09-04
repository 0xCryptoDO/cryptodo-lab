import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useMedia } from 'react-use';

import { shortenIfAddress } from '@cryptodo/frontend-sdk';

import { PER_PAGE } from '@/views/Rewards/constants';
import { Button } from '@/components';
import { getQuestsApi } from '@/api/quests';
import { REWARDS_BY_PLACE } from '@/utils/constants';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { setLeaderboard } from '@/views/Rewards/redux/rewards.slice';

import * as S from './leaderboard.style';

export const Leaderboard: FC = () => {
  const { page, items, count } = useTypedSelector(
    (state) => state.rewards.leaderboard
  );

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('Quests');
  const isMobile = useMedia('(max-width: 1024px)', false);
  const { getLeaderboard } = getQuestsApi();

  const PAGES_COUNT = Math.ceil(count / PER_PAGE);

  const handleShowMore = async () => {
    setIsLoading(true);

    const leaderboard = await getLeaderboard({
      limit: PER_PAGE,
      offset: page * PER_PAGE - 50,
    });

    dispatch(
      setLeaderboard({
        page: page + 1,
        items: [...items, ...leaderboard.items],
      })
    );
    setIsLoading(false);
  };

  return (
    <S.Leaderboard>
      <S.BlockTitle>{t('leaderboard.title')}</S.BlockTitle>
      <S.Table>
        {items.map((item, index) => (
          <S.TableItem key={item.wallet}>
            {isMobile && (
              <S.MobileContainer>
                <S.TableText>{index + 1}</S.TableText>
                <S.TableText style={{ marginLeft: '7vw' }}>
                  {shortenIfAddress(item.wallet)}
                </S.TableText>
              </S.MobileContainer>
            )}
            {!isMobile && <S.TableText>{index + 1}</S.TableText>}
            {!isMobile && <S.TableText>{item.wallet}</S.TableText>}
            <S.TableText>
              {t('points', { count: item.totalPoints })}
            </S.TableText>
            {index + 1 <= 1000 ? (
              <S.TableText>
                {
                  REWARDS_BY_PLACE.find(
                    (r) => r.max >= index + 1 && r.min <= index + 1
                  )?.reward
                }{' '}
                CDO
              </S.TableText>
            ) : null}
          </S.TableItem>
        ))}
      </S.Table>
      {page !== PAGES_COUNT && (
        <S.Footer>
          <Button
            stretch={isMobile}
            onClick={handleShowMore}
            disabled={isLoading}
          >
            {t('common:showMore')}
          </Button>
        </S.Footer>
      )}
    </S.Leaderboard>
  );
};
