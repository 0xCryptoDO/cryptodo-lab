import { globalCss } from '@stitches/react';

const setupStyles = globalCss({
  body: {
    backgroundColor: '$background',
    color: '$textDark',
    fontFamily: '$inter',
    overflow:'overlay',
    transition: '0.3s ease-in-out',

    '&.overflow-hidden': {
      overflow: 'hidden',
    },
  },
  a: {
    color: '$textDark',
    cursor: 'pointer',

    '&:hover': {
      color: '$textDark',
    },
  },
  '*, ::before, ::after': {
    boxSizing: 'border-box',
  },
  'h1, h2, h3, h4, h5, h6, p': {
    margin: 0,
  },
  '.mt-md':{
    marginTop: '16px !important'
  },
  '.walletconnect-modal__mobile__toggle_selector': {
    background: '#606060 !important',
  },
});

export default setupStyles;
