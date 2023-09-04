/* eslint-disable react/destructuring-assignment */
import { ChangeEvent, forwardRef } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Text, Tooltip } from '@/components';
import { InfoSmallIcon } from '@/assets/icons';

import { InputProps } from './input.types';

import * as S from './input.style';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      required,
      label,
      popover,
      onChange,
      placeholder,
      defaultValue,
      addonAfter,
      addonAfterClick,
      addonBefore,
      addonBeforeClick,
      disabled,
      error,
      autoComplete,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation('common');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        // const newError = compareErrors(currentValue);
        onChange(event);
      }
    };

    const isError = typeof error === 'object';

    return (
      <S.Input size="small" direction="vertical">
        {label && (
          <S.Label>
            {label}
            {required && <Text type="danger">*</Text>}
            {popover && (
              <Tooltip content={popover}>
                <S.PopoverButton type="button">
                  <InfoSmallIcon />
                </S.PopoverButton>
              </Tooltip>
            )}
          </S.Label>
        )}
        <S.InputWrapper>
          {addonBefore && (
            <S.Addon
              onClick={() => {
                if (addonBeforeClick) {
                  addonBeforeClick();
                }
              }}
            >
              {addonBefore}
            </S.Addon>
          )}
          <S.InputComponent
            ref={ref}
            value={value}
            autoComplete={autoComplete}
            type="text"
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            {...props}
          />
          {addonAfter && (
            <S.Addon
              onClick={() => {
                if (addonAfterClick) {
                  addonAfterClick();
                }
              }}
            >
              {addonAfter}
            </S.Addon>
          )}
        </S.InputWrapper>
        {isError && (
          <S.Error>{t(`fieldErrors.${error.text}`, { ...error })}</S.Error>
        )}
      </S.Input>
    );
  }
);
