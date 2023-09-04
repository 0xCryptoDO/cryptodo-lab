import { FC } from 'react';
import DatePickerPrimitive from 'react-datepicker';
import useTranslation from 'next-translate/useTranslation';

import { Text, Tooltip } from '@/components';
import { InfoSmallIcon } from '@/assets/icons';

import { DatePickerProps } from './datePicker.types';

import * as S from './datePicker.style';

export const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    value,
    error,
    onChange,
    errorMessage,
    onBlur,
    disabled,
    label,
    popover,
    required,
    minDate,
    maxDate,
    showTimeInput = true,
    dateFormat,
  } = props;
  const { t } = useTranslation('common');

  const isError = () => errorMessage || typeof error === 'object';

  return (
    <S.Wrapper>
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
      <DatePickerPrimitive
        selected={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        showTimeInput={showTimeInput}
        dateFormat={dateFormat || '(dd/MM/yyyy) HH:mm'}
      />
      {isError() && (
        <S.Error>
          {t(`fieldErrors.${errorMessage || error?.message.text}`)}
        </S.Error>
      )}
    </S.Wrapper>
  );
};
