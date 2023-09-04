import { FC } from 'react';

import { SpaceProps } from './space.types';

import * as S from './space.style';

export const Space: FC<SpaceProps> = (props) => {
  const { children, size, align, direction, css } = props;
  return (
    <S.Space size={size} align={align} direction={direction} css={css} data-testid='Space'>
      {children}
    </S.Space>
  );
};
