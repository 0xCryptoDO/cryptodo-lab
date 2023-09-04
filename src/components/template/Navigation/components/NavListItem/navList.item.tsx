import { FC } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { NavListItemProps } from './navList.item.types';
import * as S from './navList.item.style';

export const NavListItem: FC<NavListItemProps> = (props) => {
  const {
    item: { css, href, query, icon, label, action, blank },
    isActive,
  } = props;

  const { t } = useTranslation('common');

  const itemContent = (
    <S.ItemLink isActive={isActive} className="sidebar__link">
      <S.LinkIcon className="sidebar__icon">{icon}</S.LinkIcon>
      <S.LinkLabel className="sidebar__label">
        {t(`navigation.${label}`)}
      </S.LinkLabel>
    </S.ItemLink>
  );

  const link = blank ? <a style={{textDecoration: 'none'}} href={href} target='_blank' rel="noreferrer">{itemContent}</a> : <Link passHref href={{ pathname: href, query }}>{itemContent}</Link>

  return (
    <S.NavListItem
      css={css}
      onClick={() => {
        if (action) {
          action();
        }
      }}
    >
      {href ? (
        link
      ) : (
        itemContent
      )}
    </S.NavListItem>
  );
};
