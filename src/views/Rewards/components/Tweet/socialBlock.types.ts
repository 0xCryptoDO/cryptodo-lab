import { ReactNode } from 'react';

export interface SocialBlockProps {
  logo: ReactNode;
  title: string | ReactNode;
  link: string;
  linkTitle: string;
  disabled?: boolean;
  isTweet?: boolean;
}
