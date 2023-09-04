import { styled } from '@/styles';

import { Text } from '@/components/atoms/Text/style';

export const Root = styled('div');

export const DescriptionTitle = styled(Text, {
  fontSize: '24px',

  '@tablet': {
    fontSize: '20px',
  },
});

export const Block = styled('div', {
  marginTop: 20,
});

export const BlockTitle = styled(DescriptionTitle, {
  display: 'block',
  maxWidth: 'fit-content',
  marginBottom: 8,
});

export const Quests = styled(Block, {
  marginTop: 20,
});

export const QuestsContent = styled('div', {
  display: 'grid',
  gap: 10,
});

export const Ref = styled(Block);

export const Tweet = styled(Block, {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 20,
  '@tablet': {
    display: 'flex',
    flexDirection: 'column'
  },
});

export const BugBounty = styled(Block);

export const Link = styled('a', {
  display: 'block',
  maxWidth: 'fit-content',
  marginTop: 12,

  textDecoration: 'none',
});
