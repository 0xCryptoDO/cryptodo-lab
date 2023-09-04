import React from 'react';

import { DropdownProps } from './dropdown.types';

import * as S from './dropdown.style';

// TODO: investigate a problem with Trigger asChild (no need in div actually)
export const Dropdown = (props: DropdownProps) => {
  const { children, items, open, onOpenChange, css } = props;

  return (
    <S.Root open={open} onOpenChange={onOpenChange}>
      <S.Trigger asChild>
        <div>{children}</div>
      </S.Trigger>

      <S.Content sideOffset={8} align="end" css={css}>
        {items.map((item) => {
          const { icon, label, action } = item;
          return (
            <S.Item
              key={`dropdown-item-${label}`}
              onClick={() => {
                if (action) {
                  action();
                }
              }}
            >
              {icon}
              {label}
            </S.Item>
          );
        })}
        <S.Arrow offset={12} />
      </S.Content>
    </S.Root>
  );
};
