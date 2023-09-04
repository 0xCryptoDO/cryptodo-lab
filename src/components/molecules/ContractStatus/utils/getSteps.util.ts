import { Translate } from 'next-translate';

import { Network } from '@cryptodo/contracts';

import {
  Step,
  StepMeta,
} from '@/components/molecules/ContractStatus/contractStatus.types';
import { checkIfVerificationEnabled } from '@/utils/checkIfVerificationEnabled';

export const getSteps: (
  t: Translate,
  testnet?: boolean,
  network?: Network,
  aiEnabled?: boolean
) => StepMeta[] = (t, testnet, network, aiEnabled) =>
  [
    {
      id: Step.compilation,
      title: t('statuses.compilation.title'),
      message: t('statuses.compilation.message'),
    },
    {
      id: Step.aiGeneration,
      title: t('statuses.aiGeneration.title'),
      message: t('statuses.aiGeneration.message'),
    },
    {
      id: Step.deploy,
      title: t('statuses.deploy.title'),
      message: t('statuses.deploy.message'),
    },
    {
      id: Step.verification,
      title: t('statuses.verification.title'),
      message: t('statuses.verification.message'),
    },
  ]
    .filter((step) =>
      checkIfVerificationEnabled(testnet, network)
        ? true
        : step.id !== Step.verification
    )
    .filter((step) => (aiEnabled ? true : step.id !== Step.aiGeneration));
