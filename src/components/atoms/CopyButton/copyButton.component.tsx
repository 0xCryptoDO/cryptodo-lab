import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Tooltip } from '@/components';
import { CopyIcon } from '@/assets/icons';

import { CopyButtonProps } from './copyButton.types';

import * as S from './copyButton.style';

export const CopyButton: FC<CopyButtonProps> = (props) => {
  const { content, className } = props;

  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const { t } = useTranslation('common');

  const handleCopy = () => {
    setIsTooltipVisible(true);
    navigator.clipboard.writeText(content);
  };

  return (
    <S.CopyButton>
      <Tooltip
        content={`${t('copied')}!`}
        open={isTooltipVisible}
        onOpenChange={(opened: boolean) =>
          !opened && setIsTooltipVisible(false)
        }
      >
        <S.Container
          type="button"
          onClick={handleCopy}
          onMouseLeave={() => setIsTooltipVisible(false)}
          className={className}
        >
          <CopyIcon />
        </S.Container>
      </Tooltip>
    </S.CopyButton>
  );
};
