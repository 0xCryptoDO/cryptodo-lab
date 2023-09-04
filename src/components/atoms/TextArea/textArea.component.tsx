/* eslint-disable react/destructuring-assignment */
import { ChangeEvent, forwardRef } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Text, Tooltip } from '@/components';
import { InfoSmallIcon } from '@/assets/icons';

import { TextAreaProps } from './textArea.types';

import * as S from './textArea.style';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation('common');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        // const newError = compareErrors(currentValue);
        onChange(event);
      }
    };

    const isError = typeof error === 'object';

    return (
      <S.TextArea size="small" direction="vertical">
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
        <S.TextAreaWrapper>
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
          <S.TextAreaComponent
            ref={ref}
            value={value}
            autoComplete={autoComplete}
            onChange={(event) => handleChange(event)}
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
        </S.TextAreaWrapper>
        {isError && (
          <S.Error>{t(`fieldErrors.${error.text}`, { ...error })}</S.Error>
        )}
      </S.TextArea>
    );
  }
);
