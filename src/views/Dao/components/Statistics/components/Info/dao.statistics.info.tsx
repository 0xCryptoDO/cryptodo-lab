import { FC } from 'react';

import * as S from './dao.statistics.info.style';
import { InfoItemProps, InfoProps } from './dao.statistics.info.types';

const InfoItem: FC<InfoItemProps> = ({ title, text, color }) => (
  <S.Box display="inline">
    <S.Box display="block">
      <S.Title css={{ color }}>{title}</S.Title>
      <S.Text>{text}</S.Text>
    </S.Box>
  </S.Box>
);

export const Info: FC<InfoProps> = ({ content }) => (
  <S.Container>
    {content.map((currentItem) => (
      <InfoItem key={currentItem.text} {...currentItem} />
    ))}
  </S.Container>
);
