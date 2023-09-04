import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import Trans from 'next-translate/Trans';

import {
  ContractType,
  Network,
  TESTNET_ONLY_NETWORKS,
} from '@cryptodo/contracts';

import { TelegramLogo } from '@/assets/icons';
import { Breadcrumbs, Button, Text } from '@/components';
import { ReferralCard } from '@/views/Profile/components';
import { useQuestsApi } from '@/hooks/useQuestsApi';
import { serializeQuery } from '@/utils/serializeQuery';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleCreateTokenDialog } from '@/reduxStore/slices/ui/ui.slice';
import { setContractType } from '@/reduxStore/slices/contracts/contracts.slice';

import {
  Leaderboard,
  QuestCard,
  RewardsHeader,
  SocialBlock,
} from './components';
import * as S from './rewards.page.style';
import { BannerImg, BannerMobileImg } from './components/Header/header.style';

const LIST = [
  Network.bsc,
  Network.okc,
  Network.polygon,
  Network.mantle,
  Network.bitgert,
  Network.avalanche,
  Network.fiveIre,
  Network.aurora,
  Network.gate,
  Network.lightlink,
  Network.evmOs,
  Network.fantom,
  Network.zetaChain,
  Network.cronos,
  Network.arbitrum,
  Network.nautilus,
];

const NETWORKS = Object.values(LIST).map((item) => {
  if (TESTNET_ONLY_NETWORKS.includes(item)) {
    return { name: item, testnet: 1, mainnet: 0 };
  }

  return { name: item, testnet: 1, mainnet: 1 };
});

export const QuestsPage: FC = () => {
  const quests = useTypedSelector((state) => state.rewards.quests);
  const userProgress = useTypedSelector((state) => state.rewards.userProgress);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('Quests');
  const { link } = useQuestsApi();

  const questsArray = Object.entries(quests || {});
  const onCreate = (type: ContractType) => {
    dispatch(toggleCreateTokenDialog(true));
    dispatch(setContractType(type));
  };
  const TWITTER_TEXT = `🔥Just joined the Build and Earn Quests from @CryptoDo_app! \n \nLearn how to build #Web3 apps without coding and earn $CDO tokens🚀
\n📲Join me and let's explore Web 3 together: ${link}
\n #CryptoDo_b2e #CryptoDo \n\n`;
  const TWITTER_LINK = `https://twitter.com/intent/tweet?${serializeQuery({
    text: TWITTER_TEXT,
    url: window.location.origin,
  })}`;

  const isSocialTaskCompleted =
    userProgress?.userQuest.socicalMediaProgress?.telegram &&
    userProgress?.userQuest.socicalMediaProgress?.twitter &&
    userProgress?.userQuest.socicalMediaProgress?.discord;
  const isTwitPosted =
    userProgress?.userQuest.socicalMediaProgress?.twitterPosted;
  return (
    <S.Root>
      <BannerImg src="/static/img/Banner.png" alt="" />
      <BannerMobileImg src="/static/img/BannerMobile.png" alt="" />
      <Breadcrumbs
        routes={[
          { label: 'main', link: '/' },
          {
            label: 'quests',
            link: '',
          },
        ]}
      />
      <RewardsHeader />
      <S.Quests>
        <S.BlockTitle>{t('quests.title')}</S.BlockTitle>
        <S.QuestsContent>
          {questsArray.map(([key, item]) => (
            <QuestCard
              key={key}
              quests={quests}
              title={key as ContractType}
              networks={NETWORKS}
              points={item.points}
              progress={userProgress?.userQuest?.progress || {}}
              maxContracts={item.maxNumberOfCreatedContracts}
              onCreate={onCreate}
            />
          ))}
        </S.QuestsContent>
      </S.Quests>
      <S.Ref>
        <ReferralCard
          size="small"
          link={link || ''}
          statistics={{
            referralsCount: 10,
            earned: { bnb: '0', cdo: '0', busd: '00' },
          }}
          hideReferralsCount
          description={t('refDescr')}
          statsItems={[
            {
              title: t('pointsWithoutCount'),
              earned: userProgress?.userQuest.referralPoints || 0,
            },
          ]}
        />
      </S.Ref>
      <S.Tweet>
        <SocialBlock
          isTweet={!isTwitPosted}
          logo={<TwitterLogoIcon />}
          title={
            isTwitPosted ? (
              t('social.twitter.alreadyCompleted')
            ) : (
              <Trans
                i18nKey="Quests:social.twitter.title"
                components={[
                  <b style={{ color: 'rgb(117 161 255)' }}>
                    {t('social.twitter.points')}
                  </b>,
                ]}
              />
            )
          }
          disabled={isTwitPosted}
          linkTitle={t('social.twitter.action')}
          link={TWITTER_LINK}
        />
        <SocialBlock
          logo={<TelegramLogo />}
          title={
            isSocialTaskCompleted ? (
              t('social.telegram.alreadyCompleted')
            ) : (
              <Trans
                i18nKey="Quests:social.telegram.title"
                components={[
                  <b style={{ color: 'rgb(117 161 255)' }}>
                    {t('social.telegram.points')}
                  </b>,
                ]}
              />
            )
          }
          disabled={isSocialTaskCompleted}
          linkTitle={t('social.telegram.action')}
          link={`https://t.me/CryptoDo_bot?start=${userProgress?.userQuest.userId}`}
        />
      </S.Tweet>
      <S.BugBounty>
        <S.BlockTitle>{t('bug.title')}</S.BlockTitle>
        <Text>
          {t('bug.descr1')}
          <br />
          {t('bug.descr2')}
        </Text>
        <S.Link
          href="https://forms.gle/Qr5xKM85dimmKAu28"
          target="_blank"
          rel="noreferrer"
        >
          <Button>{t('bug.title')}</Button>
        </S.Link>
      </S.BugBounty>
      <Leaderboard />
    </S.Root>
  );
};
