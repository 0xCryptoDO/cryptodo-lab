import { FC, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useMedia } from 'react-use';

import { Button, Dialog } from '@/components';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { setQuestModalOpen } from '@/views/Rewards/redux/rewards.slice';

import * as S from './header.style';

export const RewardsHeader: FC = () => {
  const userProgress = useTypedSelector((state) => state.rewards.userProgress);
  const isModalOpen = useTypedSelector((state) => state.rewards.ui.isModalOpen);
  
  const dispatch = useTypedDispatch();
  const { t } = useTranslation('Quests');
  const isMobile = useMedia('(max-width: 1024px)', false);

  const onOpenChange = (value: boolean) => {
    dispatch(setQuestModalOpen(value));
  };

  const handleOpenModal = () => {
    dispatch(setQuestModalOpen(true));
  };

  const userPoints = useMemo(
    () => (
      <S.Title points>
        {t('yourPoints')}
        <span style={{'color': '#59a1dc'}}>
          {(userProgress?.userQuest.totalPoints || 0) + (userProgress?.userQuest.socialPoints || 0) + (userProgress?.userQuest.referralPoints || 0)}
        </span>
        <hr/>
      </S.Title>
    ),
    [userProgress?.userQuest, t]
  );

  return (
    <S.Root>
      <S.FlexWrapper>
        <S.Wrapper>
          <S.Title>{t('title')}</S.Title>
          <S.DescriptionTitle>
            { t('description.title') }
            <Button onClick={ handleOpenModal } css={ {
              display: 'contents', padding: '0px', backgroundColor: 'transparent', color: 'rgb(116 161 254)' ,'@tablet': {
                fontSize: '20px',
              },
            } }>
              { t('conditions') }
            </Button>
          </S.DescriptionTitle>
        {!isMobile && userPoints}
        </S.Wrapper>
      </S.FlexWrapper>
      {isMobile && userPoints}
      <Dialog
        open={isModalOpen}
        onOpenChange={onOpenChange}
        closeIcon
        title={t('conditions')}
        >
        <S.RewardsText bottomMargin>{t('description.descr')}</S.RewardsText>
        <S.RewardsText bottomMargin>{t('rewards')}</S.RewardsText>
        <S.RewardsText bottomMargin>{t('description.descr1')}</S.RewardsText>
        <S.RewardsText>{t('description.descr2')}</S.RewardsText>
      </Dialog>
    </S.Root>
  );
};
