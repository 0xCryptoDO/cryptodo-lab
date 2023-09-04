import { FC } from 'react';

import { Button } from '@/components';
import * as S from './dao.list.item.style';
import { ListItemProps, ListProps } from './dao.list.item.types';

const ListItem: FC<ListItemProps> = ({ Icon, text, to }) => (
  <S.Link href={to}>
    <Button theme="secondaryDark">
      <Icon />
      <span style={{ paddingLeft: '8px' }}>{text}</span>
    </Button>
  </S.Link>
);

export const List: FC<ListProps> = ({ content }) => (
  <S.Container>
    {content.map((currentItem) => (
      <ListItem key={currentItem.id} {...currentItem} />
    ))}
  </S.Container>
);
