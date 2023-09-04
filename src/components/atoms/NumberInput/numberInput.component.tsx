import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Text, Tooltip } from '@/components';
import { MinusThinIcon, PlusThinIcon, InfoSmallIcon } from '@/assets/icons';

import { NumberInputProps } from './numberInput.types';
import * as S from './numberInput.style';

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      getValue,
      onChange,
      handleButtonChange,
      max,
      min,
      label,
      popover,
      required,
      disabled,
      noButtons,
      placeholder,
      error,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState(
      value || (getValue && getValue()) || 0
    );

    useEffect(() => {
      const inputNumber = document.querySelector('input[type=number]');

      const wheelHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
      };

      inputNumber?.addEventListener('wheel', wheelHandler);

      return () => {
        inputNumber?.removeEventListener('wheel', wheelHandler);
      };
    }, []);

    useEffect(() => {
      if (getValue) {
        setCurrentValue(getValue());
      }
    }, [getValue]);

    const { t } = useTranslation('common');

    const handleDecrement = () => {
      if (handleButtonChange && getValue && max) {
        const newValue = +getValue() - 1;

        if (Number.isNaN(newValue)) {
          return;
        }

        handleButtonChange(newValue);
        setCurrentValue(newValue);
      }
    };

    const handleIncrement = () => {
      if (handleButtonChange && getValue && typeof min === 'number') {
        const newValue = +getValue() + 1;

        if (Number.isNaN(newValue)) {
          return;
        }

        handleButtonChange(newValue);
        setCurrentValue(newValue);
      }
    };

    const isError = () => typeof error === 'object';

    const getErrorText = () => {
      if (error?.type !== 'typeError') {
        return t(`fieldErrors.${error?.message?.text}`, { ...error?.message });
      }

      return t('fieldErrors.numberType');
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      setCurrentValue(+event.target.value);
    };

    return (
      <S.NumberInput>
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
          {!noButtons && (
            <S.Control
              type="button"
              disabled={
                typeof +currentValue !== 'number' ||
                (typeof min === 'number' && +currentValue - 1 < min)
              }
              onClick={handleDecrement}
            >
              <MinusThinIcon />
            </S.Control>
          )}
          <S.Input
            ref={ref}
            value={value}
            type="number"
            required={required}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            min={min}
            max={max}
            {...props}
          />
          {!noButtons && (
            <S.Control
              type="button"
              disabled={
                !!(
                  typeof +currentValue !== 'number' ||
                  (max && +currentValue + 1 > +max)
                )
              }
              onClick={handleIncrement}
            >
              <PlusThinIcon />
            </S.Control>
          )}
        </S.InputWrapper>
        {isError() && <S.Error>{getErrorText()}</S.Error>}
      </S.NumberInput>
    );
  }
);
