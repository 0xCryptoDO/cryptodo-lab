import { globalCss } from '@stitches/react';

const setupFonts = globalCss({
  '@font-face': [
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 300,
      src: 'local("Inter"), url("/fonts/Inter/light/inter-300.woff2") format("woff2"), url("/fonts/Inter/light/inter-300.woff") format("woff")',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 400,
      src: 'local("Inter"), url("/fonts/Inter/regular/inter-400.woff2") format("woff2"), url("/fonts/Inter/regular/inter-400.woff") format("woff")',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 500,
      src: 'local("Inter"), url("/fonts/Inter/medium/inter-500.woff2") format("woff2"), url("/fonts/Inter/light/inter-500.woff") format("woff")',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 600,
      src: 'local("Inter"), url("/fonts/Inter/semi-bold/inter-600.woff2") format("woff2"), url("/fonts/Inter/semi-bold/inter-600.woff") format("woff")',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 700,
      src: 'local("Inter"), url("/fonts/Inter/bold/inter-700.woff2") format("woff2"), url("/fonts/Inter/bold/inter-700.woff") format("woff")',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 800,
      src: 'local("Inter"), url("/fonts/Inter/extra-bold/inter-800.woff2") format("woff2"), url("/fonts/Inter/extra-bold/inter-800.woff") format("woff")',
    },
  ],
});

export default setupFonts;
