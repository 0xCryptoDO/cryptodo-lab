import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CopyField, Text } from '@/components';
import {
  BinanceLogoIcon,
  BinanceUsdLogoBgIcon,
  CryptoDoLogoBgIcon,
  PeoplesIcon,
} from '@/assets/icons';

import { ReferralCardProps } from './profile.referral.card.types';

import * as S from './profile.referral.card.style';

export const ReferralCard: FC<ReferralCardProps> = ({
  link,
  statistics,
  description,
  statsItems,
  size,
  hideReferralsCount,
}) => {
  const { t } = useTranslation('Profile');

  const {
    referralsCount,
    earned: { bnb, cdo, busd },
  } = statistics;

  return (
    <S.Card size={size}>
      <S.Title size={size}>{t('referral')}</S.Title>
      <S.Description size={size}>
        {description || t('description')}
      </S.Description>
      <CopyField
        content={link}
        childrenCSS={
          size === 'small'
            ? {
                padding: '6px 0 6px 10px',
              }
            : undefined
        }
      />
      <S.Footer size={size}>
        {!hideReferralsCount && (
          <S.FooterItem size={size}>
            <S.FooterItemTitle>{t('used')}</S.FooterItemTitle>
            <S.FooterItemCard>
              <S.FooterItemIcon>
                <PeoplesIcon />
              </S.FooterItemIcon>
              <Text>{t('peoples', { count: referralsCount || 0 })}</Text>
            </S.FooterItemCard>
          </S.FooterItem>
        )}
        <S.FooterItem size={size}>
          <S.FooterItemTitle>{t('earned')}</S.FooterItemTitle>
          <S.FooterCards>
            {statsItems ? (
              statsItems.map((item) => (
                <S.FooterItemCard key={item.title}>
                  {item.icon && (
                    <S.FooterItemIcon>{item.icon}</S.FooterItemIcon>
                  )}
                  <Text>
                    {item.earned} <Text type="secondary">{item.title}</Text>
                  </Text>
                </S.FooterItemCard>
              ))
            ) : (
              <>
                <S.FooterItemCard>
                  <S.FooterItemIcon>
                    <BinanceLogoIcon />
                  </S.FooterItemIcon>
                  <Text>
                    {bnb || 0} <Text type="secondary">BNB</Text>
                  </Text>
                </S.FooterItemCard>
                <S.FooterItemCard>
                  <S.FooterItemIcon>
                    <CryptoDoLogoBgIcon />
                  </S.FooterItemIcon>
                  <Text>
                    {cdo || 0} <Text type="secondary">CDO</Text>
                  </Text>
                </S.FooterItemCard>
                <S.FooterItemCard>
                  <S.FooterItemIcon>
                    <BinanceUsdLogoBgIcon />
                  </S.FooterItemIcon>
                  <Text>
                    {busd || 0} <Text type="secondary">BUSD</Text>
                  </Text>
                </S.FooterItemCard>
              </>
            )}
          </S.FooterCards>
        </S.FooterItem>
      </S.Footer>
    </S.Card>
  );
};
