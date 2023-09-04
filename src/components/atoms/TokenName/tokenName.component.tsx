import { Space, Text } from '@/components';

import { TokenNameProps } from './tokenName.types';

import * as S from './tokenName.style';

export const TokenName = (props: TokenNameProps) => {
  const { name, symbol } = props;

  return (
    <S.TokenName>
      <Space>
        {name}
        <Text type="secondary">{symbol}</Text>
      </Space>
    </S.TokenName>
  );
};
