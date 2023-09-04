import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ContractType } from '@cryptodo/contracts';

import { TokenTag } from '@/components';
import * as S from '@/views/CreateToken/createToken.page.style';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeErc20Form } from '@/views/CreateToken/redux/createToken.slice';
import { CreateAiFunctionTag } from '@/views/CreateToken/components/CreateAiFunctionTag/createAiFunctionTag';

export const CreateTokenTags: FC<{ allFieldsDisabled: boolean }> = ({
  allFieldsDisabled,
}) => {
  const erc20Form = useTypedSelector(
    (state) => state.createToken[ContractType.erc20Contract]
  );
  const formOptions = erc20Form.options;
  const { pause, blacklist, burn } = formOptions;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  return (
    <S.Options size="small">
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={formOptions.mint !== undefined}
        onClick={() => {
          dispatch(
            changeErc20Form({
              ...erc20Form,
              options: {
                ...formOptions,
                mint: !formOptions.mint
                  ? {
                      cap: 0,
                    }
                  : undefined,
              },
            })
          );
        }}
        infoContent={t('canMintTooltip')}
      >
        {t('canMint')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(pause)}
        onClick={() =>
          dispatch(
            changeErc20Form({
              ...erc20Form,
              options: {
                ...formOptions,
                pause: !pause,
              },
            })
          )
        }
        infoContent={t('canPauseTooltip')}
      >
        {t('canPause')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(blacklist)}
        onClick={() =>
          dispatch(
            changeErc20Form({
              ...erc20Form,
              options: {
                ...formOptions,
                blacklist: !blacklist,
              },
            })
          )
        }
        infoContent={t('blacklistTooltip')}
      >
        {t('blacklist')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(burn)}
        onClick={() =>
          dispatch(
            changeErc20Form({
              ...erc20Form,
              options: {
                ...formOptions,
                burn: !burn,
              },
            })
          )
        }
        infoContent={t('burnTooltip')}
      >
        {t('burn')}
      </TokenTag>
      <CreateAiFunctionTag
        allFieldsDisabled={allFieldsDisabled}
        type={ContractType.erc20Contract}
      />
    </S.Options>
  );
};
