import { FC, useState } from 'react';
import { useMedia } from 'react-use';
import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';

import { Button, Input } from '@/components';
import { getQuestsApi } from '@/api/quests/quests.api';
import { useQuestsApi } from '@/hooks/useQuestsApi/useQuestsApi';

import * as S from './socialBlock.style';
import { SocialBlockProps } from './socialBlock.types';

export const SocialBlock: FC<SocialBlockProps> = ({
  logo,
  link,
  linkTitle,
  title,
  disabled,
  isTweet,
}) => {
  const [tweetLinkUrl, setTweetLinkUrl] = useState('');
  
  const { t } = useTranslation('Quests');
  const isTablet = useMedia('(max-width: 1324px)', false);
  const { setTweetLink } = getQuestsApi();
  const { refreshUserProgress } = useQuestsApi();

  const onClick = async () => {
    try {
      await setTweetLink({ tweetLink: tweetLinkUrl });
      const message = t('social.twitter.tweetSucceed');
      toast.success(message);
      setTweetLinkUrl('');
      await refreshUserProgress();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <S.SocialBlock>
      <S.Logo>{logo}</S.Logo>
      <S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.Container style={isTablet ? { display: 'block' } : {}}>
          <S.ContainerElement style={isTablet ? { marginBottom: 24 } : {}}>
            <S.Link
              style={{ pointerEvents: !disabled ? 'auto' : 'none' }}
              target="_blank"
              href={disabled ? '#' : link}
            >
              <Button css={{ height: '100%' }} disabled={disabled}>
                {linkTitle}
              </Button>
            </S.Link>
          </S.ContainerElement>
          {isTweet && (
            <S.ContainerElement
              style={{ display: isTablet ? 'block' : 'flex' }}
            >
              <Input
                value={tweetLinkUrl}
                onChange={(e) => setTweetLinkUrl(e.target.value)}
                placeholder={t('social.twitter.placeholder')}
              />
              <Button
                css={isTablet ? { marginTop: 12, width: '100%' } : {}}
                onClick={onClick}
                disabled={
                  !tweetLinkUrl.length ||
                  !tweetLinkUrl.includes('https://twitter.com')
                }
              >
                {t('social.twitter.checkTweet')}
              </Button>
            </S.ContainerElement>
          )}
        </S.Container>
      </S.Wrapper>
    </S.SocialBlock>
  );
};
