import { ChangeEvent, FC } from 'react';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import * as S from '@/views/CreateTokenPage/contractComponents/CreateDao/createDao.page.style';
import { Slider } from '@/components';
import { SliderWithInputProps } from '@/components/atoms/SliderWithInput/sliderWithInput.types';

export const SliderWithInputComponent: FC<SliderWithInputProps> = ({
  value,
  setValue,
  maxValue = 100,
  minValue = 0,
  step = 1,
  allFieldsDisabled = false,
}) => {
  const setValueForSlider = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    const newValue = +inputValue;
    
    if (Number.isNaN(newValue)) {
      return;
    }

    if (newValue > maxValue) {
      setValue(maxValue);
      return;
    }

    if (newValue < minValue) {
      setValue(minValue);
      return;
    }

    setValue(newValue);
  };

  const incrementValueForSlider = () => {
    if (value === maxValue) {
      return;
    }

    setValue(Math.min(maxValue, value + step));
  };

  const decrementValueForSlider = () => {
    if (value === minValue) {
      return;
    }

    setValue(Math.max(minValue, value - step));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
      }}
    >
      <S.QuorumValue>
        <S.ButtonContainer>
          <S.ButtonForSlider onClick={decrementValueForSlider}>
            <MinusIcon />
          </S.ButtonForSlider>
          <S.InputRange
            disabled={allFieldsDisabled}
            value={value}
            onChange={setValueForSlider}
          />
          <S.ButtonForSlider onClick={incrementValueForSlider}>
            <PlusIcon />
          </S.ButtonForSlider>
        </S.ButtonContainer>
      </S.QuorumValue>
      <Slider value={value} setValue={setValue} />
    </div>
  );
};
