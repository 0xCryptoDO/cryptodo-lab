import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CheckIcon } from '@radix-ui/react-icons';

import { Button, Divider } from '@/components';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleContractCreatedDialog } from '@/reduxStore/slices/ui/ui.slice';

import * as S from './contractCreated.style';

export const ContractCreated: FC = () => {
  const contractCreatedDialogOpen = useTypedSelector((state) => state.ui.contractCreatedDialogOpen);
  
  const dispatch = useTypedDispatch();
  
  const { t } = useTranslation('common');

  const handleOpenChange = (value: boolean) => {
    dispatch(toggleContractCreatedDialog(value));
  }
  
  const closeDialog = () => handleOpenChange(false);
  
  return (
    <S.Dialog
      open={contractCreatedDialogOpen}
      onOpenChange={handleOpenChange}
      closeIcon
      action={
        <Button
          stretch
          onClick={closeDialog}
        >
          {t('excellent')}
        </Button>
      }
    >
      <S.Success>
        <CheckIcon width={24} height={24} />
      </S.Success>
      <S.Title>{t('contractCreated')}</S.Title>
      <Divider />
    </S.Dialog>
  );
};
