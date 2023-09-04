import { FC, useMemo, useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import useTranslation from 'next-translate/useTranslation';
import { useMedia } from 'react-use';
import Trans from 'next-translate/Trans';

import { ContractType } from '@cryptodo/contracts';

import { Button } from '@/components';
import { SmallArrowIcon } from '@/assets/icons';

import * as S from './questCard.style';
import { QuestCardProps } from './questCard.types';

export const QuestCard: FC<QuestCardProps> = ({
  title,
  networks,
  points,
  progress,
  maxContracts,
  quests,
  onCreate,
}) => {
  const { t } = useTranslation('Quests');
  const isMobile = useMedia('(max-width: 1024px)', false);
  const [isActive, setIsActive] = useState<boolean>(true);

  const contractQuest = progress[title];

  const count = networks
    .map(
      (item) =>
        item.mainnet * (quests[title]?.points.mainnet || 1) +
        item.testnet * (quests[title]?.points.testnet || 1)
    )
    .reduce((prev, curr) => prev + curr);

  const completedCount = Object.entries(contractQuest || {})
    .filter(([key]) => networks.find((item) => item.name === key))
    .map(([, item]) => {
      let sum = 0;

      if (item.testnet) {
        if (item.testnet > maxContracts.testnet) {
          sum += maxContracts.testnet * (quests[title]?.points.testnet || 1);
        } else {
          sum += item.testnet * (quests[title]?.points.testnet || 1);
        }
      }

      if (item.mainnet) {
        if (item.mainnet > maxContracts.mainnet) {
          sum += maxContracts.mainnet * (quests[title]?.points.mainnet || 1);
        } else {
          sum += item.mainnet * (quests[title]?.points.mainnet || 1);
        }
      }

      return sum;
    })
    .reduce((prev, curr) => prev + curr, 0);

  const toggleIsActive = () => {
    setIsActive((prevState) => !prevState);
  };

  const onClickCreate = () => {
    onCreate?.(title);
  };

  const openCard = useMemo(
    () => (
      <S.OpenCard onClick={toggleIsActive} type="button" isActive={isActive}>
        <SmallArrowIcon />
      </S.OpenCard>
    ),
    [isActive, toggleIsActive]
  );

  const titleComponents = useMemo(() => {
    switch (title) {
      case ContractType.erc20Contract:
        return [
          <S.DefaultLink href="https://youtu.be/mLnMLhzB6ko" target="_blank" />,
        ];
      case ContractType.daoContract:
        return [
          <S.DefaultLink href="https://youtu.be/lpAP-pZ0OMU" target="_blank" />,
        ];
      case ContractType.erc721Contract:
        return [
          <S.DefaultLink
            href="https://www.youtube.com/watch?v=TjC1LRZtoyM&t=1s&ab_channel=CryptoDo"
            target="_blank"
          />,
        ];
      case ContractType.lotteryContract:
        return [
          <S.DefaultLink
            href="https://www.youtube.com/watch?v=R94VwUFEQDk&t=8s&ab_channel=CryptoDo"
            target="_blank"
          />,
        ];
      case ContractType.airDropContract:
        return [
          <S.DefaultLink
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            target="_blank"
          />,
        ];
      case ContractType.icoContract:
        return [
          <S.DefaultLink
            href="https://www.youtube.com/watch?v=1JidYhZhFuo&t=1s&ab_channel=CryptoDo"
            target="_blank"
          />,
        ];
      case ContractType.vestingContract:
        return [
          <S.DefaultLink
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            target="_blank"
          />,
        ];
      default:
        return [];
    }
  }, [title]);

  return (
    <S.Card>
      <S.TitleWrapper>
        <S.Title>
          {t(`common:contractTypes.${title}`)}
          {isMobile && openCard}
        </S.Title>
        {networks.length ? (
          <S.Table>
            <S.THead>
              <S.Row>
                <S.HeaderCell>{t('common:network')}</S.HeaderCell>
                <S.HeaderCell>Test</S.HeaderCell>
                <S.HeaderCell>Main</S.HeaderCell>
              </S.Row>
            </S.THead>
            <S.TBody>
              {networks.slice(0, isActive ? undefined : 5).map(({ name }) => (
                <S.Row key={name}>
                  <S.Cell>{name}</S.Cell>
                  <S.Cell center>
                    {(contractQuest?.[name]?.testnet || 0) > 0 && <CheckIcon />}
                  </S.Cell>
                  <S.Cell center>
                    {(contractQuest?.[name]?.mainnet || 0) > 0 && <CheckIcon />}
                  </S.Cell>
                </S.Row>
              ))}
            </S.TBody>
          </S.Table>
        ) : null}
      </S.TitleWrapper>
      <S.Divider />
      <S.Wrapper>
        <S.StyledText marginBottom bold>
          <Trans
            i18nKey={`Quests:quests.contracts.${title}.title`}
            components={titleComponents}
          />
        </S.StyledText>
        <S.Wrapper flex marginBottom={isActive}>
          <S.Block columnGrid>
            <S.FlexWrapper>
              <S.StyledText>Testnet:</S.StyledText>
              &nbsp;
              <S.StyledText>
                {t('points', { count: points.testnet })}
              </S.StyledText>
            </S.FlexWrapper>
            <S.FlexWrapper>
              <S.StyledText>Mainnet:</S.StyledText>
              &nbsp;
              <S.StyledText>
                {t('points', { count: points.mainnet })}
              </S.StyledText>
            </S.FlexWrapper>
          </S.Block>
        </S.Wrapper>
        {isActive && (
          <S.StyledText>{t(`quests.contracts.${title}.descr`)}</S.StyledText>
        )}
      </S.Wrapper>
      <S.Divider />
      <S.CompletedText>
        {completedCount}/{count}
      </S.CompletedText>
      <S.Create>
        <Button stretch={isMobile} onClick={onClickCreate}>
          {t('common:create')}
        </Button>
        {!isMobile && openCard}
      </S.Create>
    </S.Card>
  );
};
