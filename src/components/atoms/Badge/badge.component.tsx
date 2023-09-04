import { BadgeProps } from './badge.types';

import * as S from './badge.style';

export const Badge = (props: BadgeProps) => {
  const { color, children } = props;

  return <S.Badge color={color}>{children}</S.Badge>;
};
