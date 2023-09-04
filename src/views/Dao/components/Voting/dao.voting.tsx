import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@/components';
import * as S from './dao.voting.style';

export const Voting: FC = () => {
  const { t } = useTranslation('Dao');

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('votingTitle')}</S.Title>
        <Button>{t('createVoting')}</Button>
      </S.Header>
    </S.Container>
  );
};
