/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Crumb } from '@/components';

import * as S from './breadcrumbs.style';

import { BreadcrumbsProps } from './breadcrumbs.types';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ routes }) => {
  const { t } = useTranslation('common');

  return (
    <S.Root>
      {routes.map((item, index) => (
        <Crumb
          key={`${item.label}-${index}`}
          title={item.noTranslation ? item.label : t(`routes.${item.label}`)}
          href={item.link}
          isLast={index === routes.length - 1}
          onClick={item.onClick}
          disabled={!!item.disabled}
        />
      ))}
    </S.Root>
  );
};
