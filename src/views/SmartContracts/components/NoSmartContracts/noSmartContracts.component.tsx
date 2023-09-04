import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Space, Text } from '@/components';
import { CubeBoxIcon, PlusIcon } from '@/assets/icons';
import { useTypedDispatch } from '@/reduxStore';
import { toggleCreateTokenDialog } from '@/reduxStore/slices/ui/ui.slice';

import * as S from './noSmartContracts.style';

export const NoSmartContracts: FC = () => {
  const { t } = useTranslation('SmartContracts');

  const dispatch = useTypedDispatch();

  const openCreateTokenDialog = () => {
    dispatch(toggleCreateTokenDialog(true));
  };

  return (
    <S.NoContract>
      <Space size="middle" direction="vertical" align="center">
        <CubeBoxIcon />
        <S.Title align="center">{t('noContract.title')}</S.Title>
      </Space>
      <Space size="large" direction="vertical" align="center">
        <Text type="secondary" align="center">
          {t('noContract.descr')}
        </Text>
        <Button onClick={openCreateTokenDialog}>
          <S.ButtonSpace align="center">
            <PlusIcon />
            {t('noContract.create')}
          </S.ButtonSpace>
        </Button>
      </Space>
    </S.NoContract>
  );
};
