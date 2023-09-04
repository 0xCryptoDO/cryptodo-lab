import { styled } from '@/styles';
import { Text } from '@/components/atoms/Text/style';

export const Root = styled('section');

export const Title = styled(Text, {
  display: 'block',
  flexShrink: 0,

  marginBottom: '4px !important',

  fontSize: '26px !important',
  fontWeight: '500 !important',

  '@laptop': {
    fontSize: '24px !important',
  },

  '@tablet': {
    fontSize: '24px !important',
  },

  variants: {
    points: {
      true: {
        '@laptop': {
          marginTop: 14,
        },

        '@tablet': {
          marginTop: 14,
        },
      },
    },
  },
});

export const FlexWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

export const Wrapper = styled('div');

export const DescriptionTitle = styled(Text, {
  marginBottom: '20px',

  fontSize: '16px',

  '@tablet': {
    fontSize: '20px',
  },
});

export const RewardsText = styled(Text, {
  whiteSpace: 'pre-wrap',

  variants: {
    bottomMargin: {
      true: {
        marginBottom: 12,
      },
    },
  },
});

export const BannerImg = styled('img', {
  marginLeft: '-4%',
  marginTop: '-4%',
  display: 'block',
  paddingBottom: '40px',
  width: '106%',
  height: '100%',
  '@tablet': {
    display: 'none'
  }
});

export const BannerMobileImg = styled('img', {
  display: 'none',
  width: '100%',
  height: 'auto',
  paddingBottom: '20px',
    '@tablet': {
      display: 'block'
    }
});
