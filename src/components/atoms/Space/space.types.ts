import { CSS } from '@stitches/react';
import { ReactNode } from 'react';

type SpaceSizes = 'small' | 'default' | 'middle' | 'big' | 'large';
type SpaceAlign = 'flexStart' | 'center' | 'flexEnd';
type SpaceDirections = 'vertical' | 'horizontal';

export interface SpaceProps {
  children?: ReactNode;
  size?: SpaceSizes;
  align?: SpaceAlign;
  direction?: SpaceDirections;
  css?: CSS;
}
