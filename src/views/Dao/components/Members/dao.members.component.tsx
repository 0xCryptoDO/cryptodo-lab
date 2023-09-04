import useTranslation from 'next-translate/useTranslation';

import { useTypedSelector } from '@/reduxStore';

import { Cards } from './components';
import * as S from './dao.members.style';

export const Members = () => {
  const partners = useTypedSelector((state) => state.dao.partners);
  
  const { t } = useTranslation('Dao');

  return (
    <S.Container>
      <S.Title>{t('membersTitle')}</S.Title>
      <S.Flex>
        <S.Additional>{t('membersAddress')}</S.Additional>
        <S.Additional>{t('membersBalance')}</S.Additional>
      </S.Flex>
      <Cards content={partners} />
    </S.Container>
  );
};
