export interface SliderWithInputProps {
  value: number;
  setValue: (newValue: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  allFieldsDisabled?: boolean;
}
