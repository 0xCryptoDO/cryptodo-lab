import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import {
  ContractStatus,
  IERC20DefOptions,
  IERC20Options,
  TransactionStatus,
} from '@cryptodo/contracts';
import { shortenIfAddress } from '@cryptodo/frontend-sdk';

import { InfoIcon } from '@/assets/icons';
import {
  Badge,
  Breadcrumbs,
  CodeSnippet,
  ContractMeta,
  Divider,
  Loader,
  ScanButton,
  Text,
  TokenName,
  Tooltip,
} from '@/components';
import { useContractApi } from '@/hooks';
import { getContractScanLink } from '@/utils';

import * as S from './viewContract.page.style';

enum AllOptions {
  Mint = 'mint',
  Burn = 'burn',
  Pause = 'pause',
  Blacklist = 'blacklist',
  IncrementTokenMaxAmount = 'incrementTokenMaxAmount',
  Presale = 'presale',
  TaxBurn = 'taxBurn',
  Team = 'team',
  Liquidity = 'liquidity',
  Penalty = 'penalty',
  AiFunction = 'aiFunction',
}

const readyOptions = [
  AllOptions.Mint,
  AllOptions.Burn,
  AllOptions.AiFunction,
  AllOptions.Penalty,
  AllOptions.TaxBurn,
  AllOptions.Pause,
  AllOptions.Blacklist,
  AllOptions.Team,
  AllOptions.IncrementTokenMaxAmount,
  AllOptions.Presale,
];

const tags = (t: Translate) => [
  {
    id: AllOptions.Mint,
    label: t('CreateToken:canMint'),
  },
  {
    id: AllOptions.Burn,
    label: t('CreateToken:burn'),
  },
  {
    id: AllOptions.Pause,
    label: t('CreateToken:canPause'),
  },
  {
    id: AllOptions.Blacklist,
    label: t('CreateToken:blacklist'),
  },
  {
    id: AllOptions.IncrementTokenMaxAmount,
    label: t('CreateToken:canIncrementTokenMaxAmount'),
  },
  {
    id: AllOptions.Presale,
    label: t('CreateToken:canPresale'),
  },
  {
    id: AllOptions.TaxBurn,
    label: t('CreateToken:taxBurn'),
  },
  {
    id: AllOptions.Team,
    label: t('CreateToken:team'),
  },
  {
    id: AllOptions.Liquidity,
    label: t('CreateToken:liquidity'),
  },
  {
    id: AllOptions.Penalty,
    label: t('CreateToken:penalty'),
  },
  {
    id: AllOptions.AiFunction,
    label: t('CreateToken:aiFunction'),
  },
];

export const ViewContractPage = () => {
  const { query, back } = useRouter();
  const { t } = useTranslation('common');

  const { getContracts } = useContractApi({ testnet: false });
  const { data: contracts = [], isValidating } = getContracts();
  const contract = contracts.find(
    (contract) =>
      contract.network === query.network &&
      (contract.address === query.address ||
        contract.testnetAddress === query.address)
  );

  if (isValidating && !contracts?.length) {
    return <Loader center />;
  }

  if (!contract) {
    return <div>Contract was not found.</div>;
  }

  const {
    address,
    name,
    symbol,
    createdAt,
    testnet,
    testnetAddress,
    abi,
    sourceCode,
    options,
    transactionStatus,
    status,
  } = contract;

  const formattedCreatedAt = format(new Date(createdAt), 'LLLL d, Y');
  const txPaid = transactionStatus === TransactionStatus.paid;
  const contractDeployed = status === ContractStatus.deployed;
  const scanMeta = getContractScanLink(contract);

  const isMainnetUnpaid = !testnet && !txPaid;
  const getStatus = () => {
    if (contractDeployed) {
      return 'deployed';
    }
    if (isMainnetUnpaid) {
      return 'waitingForPayment';
    }
    return 'waitingForDeploy';
  };

  const getTag = (tag: { id: string; label: string }) => {
    const { id, label } = tag;

    const getTooltipContent = () => {
      switch (id) {
        case AllOptions.TaxBurn: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:taxBurn')}</Text>
              <Text>{(options as IERC20DefOptions).taxBurn?.burnFee}%</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.IncrementTokenMaxAmount: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:canIncrementTokenMaxAmount')}</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Presale: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:canPresale')}</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Team: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:teamTooltip')}</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Blacklist: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:blacklistTooltip')}</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Mint: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:marketCap')}</Text>
              <Text>{options.mint?.cap}%</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Pause: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:canPauseTooltip')}</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.AiFunction: {
          return (
            <S.TagMeta>
              <Text>{options.aiFunction}</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Penalty: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:penalty')}</Text>
              <Text>{options.penalty}%</Text>
            </S.TagMeta>
          );
        }
        case AllOptions.Burn: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:burnTooltip')}</Text>
            </S.TagMeta>
          );
        }
        default: {
          return (
            <S.TagMeta>
              <Text>{t('CreateToken:marketCap')}</Text>
            </S.TagMeta>
          );
        }
      }
    };

    if (readyOptions.includes(id as AllOptions)) {
      return (
        <S.Tag>
          {label}
          <Tooltip
            key={id}
            open={undefined}
            content={getTooltipContent()}
            delayDuration={175}
          >
            <S.TagIcon>
              <InfoIcon />
            </S.TagIcon>
          </Tooltip>
        </S.Tag>
      );
    }

    return <S.Tag>{label}</S.Tag>;
  };

  return (
    <S.Wrapper>
      <Breadcrumbs
        routes={[
          { label: 'main', link: '/' },
          {
            label: shortenIfAddress(testnet ? testnetAddress : address),
            noTranslation: true,
          },
        ]}
      />
      <S.Header>
        <S.HeaderWrapper>
          <S.BackButton type="button" onClick={back}>
            <ArrowLeftIcon />
          </S.BackButton>
          <TokenName name={name} symbol={symbol} />
        </S.HeaderWrapper>
        {address && (
          <ScanButton
            theme="secondary"
            icon={scanMeta.icon}
            link={scanMeta.link}
          />
        )}
      </S.Header>
      <S.Meta>
        <Badge color={testnet ? 'purple' : 'green'}>
          {t(`networks.${testnet ? 'testnet' : 'mainnet'}`)}
        </Badge>
        <Badge color={contractDeployed ? 'green' : 'yellow'}>
          {t(`statuses.${getStatus()}`)}
        </Badge>
        <div>
          <Text type="secondary">{t('created')}: </Text> {formattedCreatedAt}
        </div>
      </S.Meta>
      <ContractMeta contract={contract} />
      <Divider />
      {options && (
        <>
          <S.Config>
            <Text>{t('CreateToken:options')}</Text>
            <S.Tags>
              {tags(t)
                .filter((tag) => options[tag.id as keyof IERC20Options])
                .map((tag) => getTag(tag))}
            </S.Tags>
          </S.Config>
          <Divider />
        </>
      )}
      {sourceCode && (
        <CodeSnippet
          title={t('SmartContracts:meta.contractSourceCode')}
          code={sourceCode}
          link="code"
          showGutter
        />
      )}
      {abi && (
        <CodeSnippet
          title={t('SmartContracts:meta.contractAbi')}
          code={abi}
          link="abi"
          showGutter={false}
          lang="json"
          css={{ marginTop: 'calc(-72px + 0.5rem)' }}
        />
      )}
    </S.Wrapper>
  );
};
