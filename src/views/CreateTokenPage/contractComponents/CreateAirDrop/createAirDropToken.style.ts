import { styled } from '@/styles';
import { Space } from '@/components/atoms/styled';

export const AdditionalBlock = styled('div', {
  marginTop: 20,
});

export const SliderColumn = styled('div', {
  width: '100%',
});

export const InfoLabel = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  marginBottom: 10,

  fontSize: '12px',
});

export const TooltipButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export const Percentage = styled('span', {
  width: '40px',
});

export const ButtonsSpace = styled(Space, {
  paddingRight: 50,
});

export const SliderSpace = styled(Space, {
  position: 'relative',
});

export const DeleteSlider = styled('button', {
  position: 'absolute',
  top: -10,
  right: -50,

  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  '& > svg': {
    width: 40,
    height: 40,
  },
});

export const SlidesContainer = styled(Space, {
  paddingRight: 0,
});

export const TypeIcon = styled('img', {
  maxWidth: 100,
});
