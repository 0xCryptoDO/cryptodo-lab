import { FC } from 'react';

import { CopyButton } from '@/components';

import { CopyFieldProps } from './copyField.types';
import { ellipseAddress } from './copyField.utils';
import * as S from './copyField.style';

export const CopyField: FC<CopyFieldProps> = ({
  content,
  placeholder,
  css,
  childrenCSS,
  elipse,
}) => (
  <S.CopyField css={css}>
    <S.Text css={childrenCSS}>
      {elipse
        ? ellipseAddress(content) || ellipseAddress(placeholder)
        : content || placeholder}
    </S.Text>
    {content && <CopyButton content={content} />}
  </S.CopyField>
);
