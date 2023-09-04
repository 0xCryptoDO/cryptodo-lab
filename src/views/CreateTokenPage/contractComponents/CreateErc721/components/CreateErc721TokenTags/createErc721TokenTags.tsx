import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ContractType } from '@cryptodo/contracts';

import { TokenTag } from '@/components';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeErc721Form } from '@/views/CreateToken/redux/createToken.slice';
import * as S from '@/views/CreateToken/createToken.page.style';
import { CreateAiFunctionTag } from '@/views/CreateToken/components';

export const CreateErc721TokenTags: FC<{ allFieldsDisabled: boolean }> = ({
  allFieldsDisabled,
}) => {
  const erc721Form = useTypedSelector(
    (state) => state.createToken[ContractType.erc721Contract]
  );
  const formOptions = erc721Form.options;
  const { incrementTokenMaxAmount, presale } = formOptions;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  return (
    <S.Options size="small">
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(incrementTokenMaxAmount)}
        onClick={() => {
          dispatch(
            changeErc721Form({
              ...erc721Form,
              options: {
                ...formOptions,
                incrementTokenMaxAmount: !incrementTokenMaxAmount,
              },
            })
          );
        }}
        infoContent={t('popoverInfo.nft.options.incrementTokenMaxAmount')}
      >
        {t('canIncrementTokenMaxAmount')}
      </TokenTag>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={Boolean(presale)}
        onClick={() => {
          dispatch(
            changeErc721Form({
              ...erc721Form,
              options: {
                ...formOptions,
                presale: !presale,
              },
            })
          );
        }}
        infoContent={t('popoverInfo.nft.options.canPresale')}
      >
        {t('canPresale')}
      </TokenTag>
      <CreateAiFunctionTag
        allFieldsDisabled={allFieldsDisabled}
        type={ContractType.erc721Contract}
      />
    </S.Options>
  );
};
