import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CheckIcon, Cross1Icon, SymbolIcon } from '@radix-ui/react-icons';
import { useMedia } from 'react-use';

import { Dialog, Loader } from '@/components';
import { CloseIcon } from '@/assets/icons';
import { Button } from '@/components/atoms/styled';
import { getSteps } from '@/components/molecules/ContractStatus/utils/getSteps.util';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleContractStatusDialog } from '@/reduxStore/slices/ui/ui.slice';

import { Step } from './contractStatus.types';
import * as S from './contractStatus.style';

export const ContractStatus: FC = () => {
  const selectedBlockchain = useTypedSelector(
    (state) => state.contracts.createToken.network
  );
  const retryFunction = useTypedSelector(
    (state) => state.contracts.createToken.retryFunction
  );
  const changeAllFieldDisabled = useTypedSelector((state) => state.contracts.changeAllFieldDisabled);
  const {
    is,
    step: currentStep,
    testnet,
    errorMessage,
    aiEnabled,
    aiFunctionStatus,
  } = useTypedSelector((state) => state.ui.contractStatusDialog);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('common');
  const isMobile = useMedia('(max-width: 769px)', false);

  const steps = getSteps(t, testnet, selectedBlockchain, aiEnabled);

  const handleClose = () => {
    if (changeAllFieldDisabled) {
      changeAllFieldDisabled(false);
    }
    
    dispatch(
      toggleContractStatusDialog({
        is: false,
        step: undefined,
        testnet: undefined,
      })
    );
  };
  
  const handleRetry = () => {
    if (retryFunction) {
      retryFunction();
    }
  }

  if (currentStep === Step.error) {
    steps[aiEnabled ? 2 : 1] = {
      id: Step.error,
      title: t('statuses.deploy.title'),
      message: t('statuses.error.message'),
    };
  }

  if (currentStep === Step.rejectNetwork) {
    steps[aiEnabled ? 2 : 1] = {
      id: Step.rejectNetwork,
      title: t('statuses.rejectNetwork.title'),
      message: t('statuses.rejectNetwork.message'),
    };
  }

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      <S.AiStatus>{aiFunctionStatus === undefined ? null : aiFunctionStatus ? <CheckIcon /> : <CloseIcon />}</S.AiStatus>
      <Dialog
        open={is}
        css={{
          padding: '1.5rem 1.5rem 2rem',
          width: isMobile ? 'calc(100% - 40px)' : 'auto',
          borderRadius: '$default',
        }}
        title={t('inTheMaking')}
      >
        <S.Status>{t('status')}</S.Status>
        <S.Steps>
          {steps.map((step, i) => {
            const { id: stepId, title, message } = step;
            const isActive = stepId === currentStep;
            const activeStepIndex = steps.findIndex(
              ({ id: stepId }) => stepId === currentStep
            );
            const isCompleted = activeStepIndex > i;
  
            let metaMessage = message;
            if (isCompleted) {
              metaMessage = t('statuses.ready');
            } else if (stepId === Step.rejectNetwork) {
              metaMessage = t('statuses.rejectNetwork.message');
            } else if (stepId === Step.error) {
              metaMessage = t('statuses.error.message');
            } else if (!isActive) {
              metaMessage = t('statuses.waitingForPrevStage');
            }
            if (errorMessage && isActive) {
              metaMessage = errorMessage;
            }
            return (
              <S.Step key={stepId} data-testid="Step">
                {/* eslint-disable-next-line no-nested-ternary */}
                {isCompleted ? (
                  <S.Completed>
                    <CheckIcon />
                  </S.Completed>
                ) : [Step.rejectNetwork, Step.error].includes(stepId) ||
                  (isActive && errorMessage) ? (
                  <S.Failed>
                    <Cross1Icon />
                  </S.Failed>
                ) : (
                  <S.Loader loading={isActive}>
                    {isActive && <Loader width={40} height={40} />}
                    <div>{`0${i + 1}`}</div>
                  </S.Loader>
                )}
                <S.Meta>
                  <S.MetaTitle>{title}</S.MetaTitle>
                  <S.MetaMessage>{metaMessage}</S.MetaMessage>
                </S.Meta>
                {[Step.rejectNetwork, Step.error].includes(stepId) ||
                (isActive && errorMessage) ? (
                  <S.ImgWrapper>
                    <SymbolIcon
                      style={{ width: '20px', height: '20px' }}
                      onClick={handleRetry}
                    />
                  </S.ImgWrapper>
                ) : null}
              </S.Step>
            );
          })}
          {([Step.rejectNetwork, Step.error].includes(currentStep as Step) ||
            errorMessage) && (
            <Button onClick={handleClose} size="large">
              {t('close')}
            </Button>
          )}
        </S.Steps>
      </Dialog>
    </>
  );
};
