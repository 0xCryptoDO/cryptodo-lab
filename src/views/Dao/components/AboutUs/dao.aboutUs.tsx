import { useTypedSelector } from '@/reduxStore';

import * as S from './dao.aboutUs.style';

export const AboutUs = () => {
  const name = useTypedSelector((state) => state.dao.name);

  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      {/* <S.Description>{t('aboutDescription')}</S.Description> */}
    </S.Container>
  );
};
