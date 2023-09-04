import Link from 'next/link';

import { darkTheme, styled } from '@/styles';

export const Card = styled('div', {
  display: 'grid',
  gridTemplateColumns: '200px 21px 1fr 21px 50px 120px',
  gridTemplateRows: '1fr',
  gap: 20,

  width: '100%',
  padding: 16,

  backgroundColor: '$white',
  borderRadius: 2,

  '@laptop': {
    gridTemplateColumns: '100%',
  },

  '@tablet': {
    gridTemplateColumns: '100%',
  },
});

export const TitleWrapper = styled('div', {});

export const Title = styled('h2', {
  fontSize: '20px',
  fontWeight: 500,

  '@laptop': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '@tablet': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const Table = styled('table', {
  marginTop: 14,

  borderCollapse: 'collapse',
});

export const THead = styled('thead');

export const TBody = styled('tbody');

export const Row = styled('tr');

export const Cell = styled('td', {
  padding: 2,

  border: '1px solid $border',

  variants: {
    center: {
      true: {
        textAlign: 'center',
      },
    },
  },
});

export const HeaderCell = styled('th', {
  padding: '4px',

  border: '1px solid $border',

  textAlign: 'left',
});

export const Divider = styled('div', {
  height: '100%',
  width: 1,
  margin: '0 20px',

  backgroundColor: '$border',

  '@laptop': {
    height: 1,
    width: '100%',
    margin: '20px 0',
  },

  '@tablet': {
    height: 1,
    width: '100%',
    margin: '20px 0',
  },
});

export const Wrapper = styled('div', {
  variants: {
    flex: {
      true: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 30,
        flexShrink: 0,
      },
    },
    marginBottom: {
      true: {
        marginBottom: 30,
      },
    },
  },
});

export const Block = styled('div', {
  variants: {
    columnGrid: {
      true: {
        display: 'grid',
        gap: 16,
        gridAutoRows: 'max-content',
      },
    },
  },
});

export const FlexWrapper = styled('div', {
  display: 'flex',
});

export const StyledText = styled('span', {
  display: 'block',

  fontSize: '20px',

  variants: {
    marginBottom: {
      true: {
        marginBottom: 20,
      },
    },
    bold: {
      true: {
        fontWeight: 700,
      },
    },
  },
});

export const DefaultLink = styled('a');

export const CompletedText = styled(StyledText, {
  paddingTop: '12px',
  fontSize: 20,
});

export const Create = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: 10,

  marginLeft: 'auto',

  '@laptop': {
    display: 'block',

    marginLeft: 0,
  },

  '@tablet': {
    display: 'block',

    marginLeft: 0,
  },
});

export const OpenCard = styled('button', {
  justifySelf: 'flex-end',

  width: 48,
  height: 48,

  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: 100,
  border: 'none',
  cursor: 'pointer',

  transition: '0.2s ease-in-out',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  [`.${darkTheme} &`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  },

  variants: {
    isActive: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

export const Container = styled('div', {
  display: 'flex',
});

export const StyledLink = styled(Link);
