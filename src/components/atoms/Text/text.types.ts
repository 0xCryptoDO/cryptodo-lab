import { ReactNode } from 'react';
import { CSS } from "@stitches/react";

type TextTypes = 'secondary' | 'danger';
type TextWeight = 'normal' | 'middle';
type TextSizes = 'small' | 'default' | 'middle' | 'big';
type TextAlign = 'left' | 'center' | 'right';

export interface TextProps {
  type?: TextTypes;
  children?: ReactNode;
  className?: string;
  weight?: TextWeight;
  size?: TextSizes;
  align?: TextAlign;
  css?: CSS;
  popover?: ReactNode;
}
