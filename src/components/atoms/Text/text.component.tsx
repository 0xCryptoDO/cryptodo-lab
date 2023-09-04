import { FC } from 'react';

import { InfoSmallIcon } from '@/assets/icons';
import { Tooltip } from '@/components';
import { TextProps } from './text.types';

import * as S from './style';

export const Text: FC<TextProps> = ({
  type,
  className,
  weight,
  size,
  children,
  align,
  popover,
}) => (
  <S.Text
    type={type}
    weight={weight}
    className={className}
    size={size}
    align={align}
    data-testid='Text'
  >
    {children}
    {popover && (
              <Tooltip content={popover}>
                <S.PopoverButton type="button">
                  <InfoSmallIcon />
                </S.PopoverButton>
              </Tooltip>
            )}
  </S.Text>
);
