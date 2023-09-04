import React from 'react';
import { SwitchProps } from './switch.types';
import * as S from './switch.style';

export const Switch = ({
  label,
  id,
  disabled,
  checked,
  onCheckedChange
}: SwitchProps) => (
  <S.Flex css={ { alignItems: 'center' } }>
    <S.Label htmlFor={ id || 'switch-mode' } css={ { paddingRight: 15 } }>
      { label }
    </S.Label>
    <S.SwitchRoot
      disabled={ disabled }
      id={ id || 'switch-mode' }
      checked={ checked }
      onCheckedChange={ onCheckedChange }
    >
      <S.SwitchThumb />
    </S.SwitchRoot>
  </S.Flex>
);