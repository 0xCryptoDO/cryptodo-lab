import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Dialog } from '@/components';

import { DeployConfirmationProps } from './deployConfirmation.types';

export const DeployConfirmation: FC<DeployConfirmationProps> = (props) => {
  const { open, toggle, submit } = props;

  const { t } = useTranslation('common');

  return (
    <Dialog
      open={open}
      onOpenChange={toggle}
      title={t('deployConfirmationDialog.title')}
      action={
        <div>
          <Button onClick={() => submit()} css={{ marginTop: '1rem' }}>
            {t('deployConfirmationDialog.button')}
          </Button>
        </div>
      }
      closeIcon
      css={{
        fontSize: '.875rem',
        lineHeight: '1.25rem',
        borderRadius: '$default',
      }}
    >
      {t('deployConfirmationDialog.message')}
    </Dialog>
  );
};
