import React from 'react';
import { SliderProps } from '@/components/atoms/Slider/slider.types';
import * as S from './slider.style';

export const Slider = (props: SliderProps) => (
  <S.Slider
    value={[props.value]}
    onValueChange={([value]) => props.setValue(value)}
    max={100}
    step={1}
  >
    <S.StyledTrack>
      <S.StyledRange />
    </S.StyledTrack>
    <S.StyledThumb />
  </S.Slider>
);
