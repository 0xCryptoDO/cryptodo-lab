import { styled } from '@/styles';

export const CodeSnippet = styled('div', {
  marginTop: -72,
  paddingTop: 72,
});

export const Wrapper = styled('div', {
  backgroundColor: '$white',
  border: '0.5px solid $border',
  borderRadius: 2,
});

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '2px 2px 0 0',
  borderBottom: '0.5px solid $border',
  paddingLeft: '1.5rem',

  h5: {
    margin: 0,
  },
});

export const Title = styled('h5', {
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.4,
});

export const Code = styled('div', {
  padding: '1.25rem 1.5rem',
  overflowY: 'scroll',

  variants: {
    preWrap: {
      true: {
        height: '200px',

        fontFamily:
          'SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
        fontSize: 12,
        whiteSpace: 'pre-wrap',
      },
    },
  },
});

export const Buttons = styled('div', {
  display: 'flex',
});
export const Button = styled('button', {
  background: 'transparent',
  padding: '1.25rem',
  borderWidth: 0,
  borderLeft: '0.5px solid $border',
  cursor: 'pointer',

  '& > svg > path': {
    transition: 'stroke 0.3s ease-in-out',
    willChange: 'transition',
    stroke: 'rgb(169, 169, 177)',
    strokeOpacity: 1,
  },

  '&:hover > svg > path': {
    stroke: '$primary',
  },
});
