/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';

import { Divider } from '@/components';
import { SmallArrowIcon } from '@/assets/icons';

import { CollapseItemProps, CollapseProps } from './collapse.types';

import * as S from './collapse.style';

export const Collapse: FC<CollapseProps> = (props) => (
  <S.Collapse {...props}>{props.children}</S.Collapse>
);

export const CollapseItem: FC<CollapseItemProps> = ({
  header,
  value,
  children,
}) => (
  <S.CollapseItem value={value}>
    <S.StyledHeader>
      <S.StyledTrigger>
        {header}
        <SmallArrowIcon />
      </S.StyledTrigger>
    </S.StyledHeader>
    <S.StyledContent>
      <Divider />
      {children}
    </S.StyledContent>
  </S.CollapseItem>
);
