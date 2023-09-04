import { FC, useMemo } from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { uuid } from '@walletconnect/utils';

import { CheckboxProps } from '@/components/atoms/Checkbox/checkbox.types';

import * as S from './checkbox.style';

export const Checkbox: FC<CheckboxProps> = ({ label, defaultChecked = false, checked, onCheckedChange, name }) => {
  const id = useMemo(() => uuid(), []);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <S.CheckboxRoot
        className="CheckboxRoot"
        defaultChecked={defaultChecked}
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value, name)}
      >
        <CheckboxRadix.Indicator className="CheckboxIndicator">
          <CheckIcon />
        </CheckboxRadix.Indicator>
      </S.CheckboxRoot>
      <S.Label htmlFor={id}>
        {label}
      </S.Label>
    </div>
  );
};
