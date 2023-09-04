import { ChangeEvent, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CollapseItem, Space, TextArea } from '@/components';
import { changeFormOptions } from '@/views/CreateToken/utils';
import { useTypedSelector } from '@/reduxStore';

import { CreateTokenAiOptionProps } from './createTokenAiOption.types';

export const CreateTokenAiOption: FC<CreateTokenAiOptionProps> = ({
  allFieldsDisabled,
  type,
  error,
  clearErrors,
}) => {
  const value = useTypedSelector(
    (state) => state.createToken[type].options.aiFunction
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    clearErrors('options.aiFunction');
    changeFormOptions(type, {
      aiFunction: event.target.value,
    });
  };

  const { t } = useTranslation('CreateToken');
  
  if (value === undefined) {
    return null;
  }

  return (
    <CollapseItem value="5" header={t('addFunction')}>
      <Space size="large" direction="vertical">
        <TextArea
          label={t('functionDescription')}
          required
          placeholder={t('functionDescription')}
          disabled={allFieldsDisabled}
          value={value}
          error={error}
          onChange={handleChange}
        />
      </Space>
    </CollapseItem>
  );
};
