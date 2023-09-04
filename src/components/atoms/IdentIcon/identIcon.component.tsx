import { FC } from 'react';

import { IdentIconProps } from './identIcon.types';

import * as S from './identIcon.style';

export const IdentIcon: FC<IdentIconProps> = ({ id }) => (
  <S.IdentIcon src={`/static/img/IdentIcons/${id}.png`} alt="" />
);
