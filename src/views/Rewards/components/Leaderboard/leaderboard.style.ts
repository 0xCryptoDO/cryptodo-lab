import { styled } from '@/styles';
import { Text } from '@/components/atoms/Text/style';
import { Block, DescriptionTitle } from '@/views/Rewards/rewards.page.style';

export const Leaderboard = styled(Block);

export const BlockTitle = styled(DescriptionTitle, {
  display: 'block',

  marginBottom: 8,
});

export const Table = styled('div', {
  maxWidth: 650
});

export const TableItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',

  padding: '14px 0',

  borderTop: '1px solid $border',

  '&:last-child': {
    borderBottom: '1px solid $border',
  },
});

export const TableText = styled(Text, {
  minWidth: 20
});

export const MobileContainer = styled(Text);

export const Footer = styled('div', {
  marginTop: 20,
});
