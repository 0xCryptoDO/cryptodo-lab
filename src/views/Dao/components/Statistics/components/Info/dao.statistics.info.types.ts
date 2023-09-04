import { FC } from 'react';

export interface InfoItemProps {
  Icon: FC | string;
  title: string;
  text: string;
  color: string;
}

export interface InfoProps {
  content: InfoItemProps[];
}
