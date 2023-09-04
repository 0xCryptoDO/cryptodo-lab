import useTranslation from 'next-translate/useTranslation';

import { Button, Text } from '@/components';

import { ScanButtonProps } from './scanButton.types';

import * as S from './scanButton.style';

export const ScanButton = (props: ScanButtonProps) => {
  const { link, theme, icon } = props;
  const { t } = useTranslation('common');

  const handleClick = () => {
    window.open(link);
  };

  return (
    <Button theme={ theme } onClick={ handleClick }>
      <S.Flex>
        { icon }
        <Text>{ t(link.includes('tx') ? 'viewTransactionInExplorer' : 'viewInExplorer') }</Text>
      </S.Flex>
    </Button>
  );
};
