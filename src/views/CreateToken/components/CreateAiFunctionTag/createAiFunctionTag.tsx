import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TokenTag } from '@/components';
import { changeForm } from '@/views/CreateToken/redux/createToken.slice';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { CreateAiFunctionTagProps } from '@/views/CreateToken/components/CreateAiFunctionTag/createAiFunctionTag.types';

import * as S from '../../createToken.page.style';

export const CreateAiFunctionTag: FC<CreateAiFunctionTagProps> = ({
  type,
  allFieldsDisabled,
}) => {
  const options = useTypedSelector((state) => state.createToken[type].options);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  const toggleAiFunction = () => {
    dispatch(
      changeForm({
        data: {
          options: {
            ...options,
            aiFunction: options.aiFunction === undefined ? '' : undefined,
          },
        },
        type,
      })
    );
  };

  return (
    <S.TokenTagWrapper style={{ border: '1px solid #0439a2', borderRadius: 8 }}>
      <TokenTag
        disabled={allFieldsDisabled}
        isActive={options.aiFunction !== undefined}
        onClick={toggleAiFunction}
        infoContent={t('aiFuncTooltip')}
        showPlusIcon={false}
      >
        <span style={{ fontSize: '20px', color: 'gold' }}>★</span>{' '}
        {t('aiFunction')}
      </TokenTag>
    </S.TokenTagWrapper>
  );
};
