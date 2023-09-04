/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';

import { Loader } from '@/components';

import { ButtonProps } from './button.types';
import * as S from './button.style';

export const Button: FC<ButtonProps> = (props) => {
  const {
    theme = 'primary',
    className,
    children,
    stretch,
    size = 'large',
    onClick,
    disabled,
    css,
    isLoading,
  } = props;
  return (
    <S.Button
      theme={theme}
      className={className ? `${className} button` : 'button'}
      css={css}
      stretch={stretch}
      onClick={(e) => {
        if (!disabled && onClick) {
          onClick(e);
        }
      }}
      size={size}
      disabled={disabled}
    >
      {isLoading ? (
        <Loader width={18} height={18} style={{ marginRight: 4 }} />
      ) : null}
      {children}
    </S.Button>
  );
};
