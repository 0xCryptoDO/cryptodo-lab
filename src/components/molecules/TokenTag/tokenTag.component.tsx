import { FC, ReactNode } from 'react';

import { Space, Tooltip, Text } from '@/components';
import { InfoIcon, PlusIcon } from '@/assets/icons';

import * as S from './tokenTag.style';

type TokenTagProps = {
  infoContent?: string;
  isActive: boolean;
  onClick?: () => void;
  children: ReactNode;
  disabled: boolean;
  showPlusIcon?: boolean;
};

export const TokenTag: FC<TokenTagProps> = ({
  infoContent,
  isActive,
  onClick,
  children,
  disabled,
  showPlusIcon = true,
}) => (
  <S.Container isActive={isActive} disabled={disabled} onClick={onClick}>
    <Space size="small" align="center">
      {onClick && showPlusIcon && (
        <S.PlusIconWrapper>
          <PlusIcon data-testid='PlusIcon' />
        </S.PlusIconWrapper>
      )}
      <Text weight="normal">{children}</Text>
      {infoContent && (
        <Tooltip content={infoContent}>
          <S.OptionDescription>
            <InfoIcon />
          </S.OptionDescription>
        </Tooltip>
      )}
    </Space>
  </S.Container>
);
