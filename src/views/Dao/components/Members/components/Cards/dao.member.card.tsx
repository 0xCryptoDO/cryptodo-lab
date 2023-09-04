import { FC } from 'react';

import { CopyField } from '@/components';

import * as S from './dao.member.card.style';
import { CardsProps, CardProps } from './dao.member.card.types';

const Card: FC<CardProps> = ({ shares, percents, address }) => (
  <S.Card>
    <S.Box>
      <S.Image />
      <CopyField
        content={address}
        elipse
        childrenCSS={{
          paddingLeft: 0,
          fontSize: 12,
          marginRight: 4,
          '&::after': {
            width: 0,
          },
        }}
        css={{
          background: 'transparent',
          border: 'none',
          '& > button': {
            borderLeft: 'none',
            width: 12,
          },
        }}
      />
    </S.Box>
    <S.Block>
      <S.Additional variant="primary">{shares}</S.Additional>
      <S.Additional>{percents}%</S.Additional>
    </S.Block>
  </S.Card>
);

export const Cards: FC<CardsProps> = ({ content }) => (
  <S.Container>
    {content.map((currentItem) => (
      <Card key={currentItem.address} {...currentItem} />
    ))}
  </S.Container>
);
