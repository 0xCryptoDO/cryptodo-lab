import { CSS } from '@stitches/react';

export interface CodeSnippetProps {
  title: string;
  link: string;
  code: string;
  className?: string;
  css?: CSS;
  showGutter?: boolean;
  lang?: 'js' | 'json';
}
