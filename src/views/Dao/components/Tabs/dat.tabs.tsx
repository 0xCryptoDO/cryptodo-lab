import { FC, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components';

import * as S from './dat.tabs.style';
import { TabsProps } from './dat.tabs.types';

export const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation('Dao');

  const TABS = useMemo(
    () => [
      {
        label: t('tabs.voting'),
      },
    ],
    [t]
  );

  return (
    <S.Container>
      {TABS.map((tab, index) => (
        <Button
          key={tab.label}
          theme={activeTab === index + 1 ? 'primary' : 'secondary'}
          onClick={() => setActiveTab(index + 1)}
        >
          {tab.label}
        </Button>
      ))}
    </S.Container>
  );
};
