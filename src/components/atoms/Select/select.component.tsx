import { FC } from 'react';
import { Value } from '@radix-ui/react-select';

import { SmallArrowIcon } from '@/assets/icons';

import { SelectProps } from './select.types';

import * as S from './select.style';

export const Select: FC<SelectProps> = ({
  children,
  items,
  value,
  defaultValue,
  noBorder,
  onChange,
  css,
}) => (
  <S.Select value={value} defaultValue={defaultValue} onValueChange={onChange}>
    <S.StyledTrigger noBorder={noBorder} css={css}>
      {children || (
        <>
          <Value />
          <SmallArrowIcon />
        </>
      )}
    </S.StyledTrigger>
    <S.StyledContent>
      <S.StyledViewport>
        {items.map((item) => (
          <S.StyledItem disabled = {item.disabled} value={item.value} key={`${item.value}-${item.label}`}>
            <S.StyledItemText>{item.label}</S.StyledItemText>
          </S.StyledItem>
        ))}
      </S.StyledViewport>
    </S.StyledContent>
  </S.Select>
);
