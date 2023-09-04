import { FC } from 'react';
import { Space, Tooltip } from '@/components';
import { InfoSmallIcon } from '@/assets/icons';
import * as S from './style';

import { TokenCardProps } from './types';

export const TokenCard: FC<TokenCardProps> = ({
  isActive,
  disabled,
  onClick,
  logo,
  name,
  popover,
  horizontal
}) => (
  <S.TokenCard>
    <S.ItemButton
      horizontal={horizontal}
      isActive={isActive}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <Space direction="vertical">
        <S.BlockchainIcon>{logo}</S.BlockchainIcon>
        <S.BlockchainName>{name}</S.BlockchainName>
      </Space>
    </S.ItemButton>

    {popover && (
      <Tooltip content={popover}>
        <S.PopoverButton type="button">
          <InfoSmallIcon />
        </S.PopoverButton>
      </Tooltip>
    )}
  </S.TokenCard>
);
