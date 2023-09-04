import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ContractType } from '@cryptodo/contracts';

import { TokenTag } from '@/components';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import * as S from '@/views/CreateToken/createToken.page.style';
import { changeErc20DefForm } from '@/views/CreateToken/redux/createToken.slice';
import { CreateAiFunctionTag } from '@/views/CreateToken/components';

export const CreateDefTokenTags: FC<{ allFieldsDisabled: boolean }> = ({
  allFieldsDisabled,
}) => {
  const defForm = useTypedSelector((state) => state.createToken[ContractType.erc20DefContract]);
  
  const formOptions = defForm.options;
  const { pause, blacklist, burn, taxBurn } = formOptions;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  return (
    <S.Options size="small">
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={formOptions.mint !== undefined}
        onClick={() => {
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              mint: !formOptions.mint
                ? {
                    cap: 0,
                  }
                : undefined,
            },
          }));
        }}
        infoContent={t('canMintTooltip')}
      >
        {t('canMint')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(pause)}
        onClick={() =>
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              pause: !pause,
            },
          }))
        }
        infoContent={t('canPauseTooltip')}
      >
        {t('canPause')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(blacklist)}
        onClick={() =>
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              blacklist: !blacklist,
            },
          }))
        }
        infoContent={t('blacklistTooltip')}
      >
        {t('blacklist')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(burn)}
        onClick={() =>
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              burn: !burn,
            },
          }))
        }
        infoContent={t('burnTooltip')}
      >
        {t('burn')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(taxBurn)}
        onClick={() => {
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              taxBurn: !taxBurn
                ? {
                    burnFee: 0,
                  }
                : undefined,
            },
          }));
        }}
        infoContent={t('taxBurnTooltip')}
      >
        {t('taxBurn')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(formOptions.team)}
        onClick={() => {
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              team: !formOptions.team
                ? {
                    teamFee: 0,
                    teamWallet: '',
                  }
                : undefined,
            },
          }));
        }}
        infoContent={t('teamTooltip')}
      >
        {t('team')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={formOptions.liquidity !== undefined}
        onClick={() => {
          dispatch(changeErc20DefForm({
            ...defForm,
            options: {
              ...formOptions,
              liquidity: !formOptions.liquidity
                ? {
                    router: '0',
                    liquidityFee: 0,
                  }
                : undefined,
            },
          }));
        }}
        infoContent={t('liquidityTooltip')}
      >
        {t('liquidity')}
      </TokenTag>
      <CreateAiFunctionTag allFieldsDisabled={allFieldsDisabled} type={ContractType.erc20DefContract} />
    </S.Options>
  );
};
