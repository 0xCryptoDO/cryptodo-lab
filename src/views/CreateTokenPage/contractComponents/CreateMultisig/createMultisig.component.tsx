import { Cross1Icon } from '@radix-ui/react-icons';
import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { isAddress } from 'ethers/lib/utils';
import { useFieldArray } from 'react-hook-form';

import { ContractType, TESTNET_ONLY_NETWORKS } from '@cryptodo/contracts';
import { useEthers } from '@cryptodo/frontend-sdk';

import {
  Button,
  DeployConfirmation,
  Divider,
  Input,
  NumberInput,
  SliderWithInputComponent,
  Space,
  Switch,
  Text,
  TokenTag,
} from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import {
  CreateAiFunctionTag,
  CreateTokenAiOption,
  CreateTokenPricing,
} from '@/views/CreateToken/components';
import * as MainS from '@/views/CreateToken/createToken.page.style';
import { getContractsApi } from '@/api/contracts';
import { useTypedSelector } from '@/reduxStore';

import { useCreateMultisig } from './hooks';
import * as S from './createMultisig.style';
import { MultisigOwner } from './createMultisig.types';

export const CreateMultisig: FC<BaseCreateContractProps> = (props) => {
  const {
    nameContract,
    allFieldsDisabled,
    handleOpenModal,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    confirm,
    isTestnet,
  } = props;

  const selectedBlockchain = useTypedSelector(
    (state) => state.contracts.createToken.network
  );

  const [isMainnet, setIsMainnet] = useState(false);
  const [targetContract, setTargetContract] = useState('');
  const [quorum, setQuorum] = useState(50);
  const [functionNames, setFunctionNames] = useState<string[]>([]);

  const {
    setValue,
    handleSubmit,
    register,
    errors,
    getFormData,
    trigger,
    formOptions,
    control,
    setError,
    clearErrors,
  } = useCreateMultisig(handleOpenModal);
  const { account } = useEthers();
  const { t } = useTranslation('CreateToken');
  const { getWriteContractFunctions } = getContractsApi();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'owners',
  });

  const { data: contractWriteFunctions } = useSWRImmutable(
    targetContract && isAddress(targetContract)
      ? [targetContract, isMainnet]
      : null,
    () =>
      getWriteContractFunctions({
        address: targetContract,
        network: selectedBlockchain,
        testnet: !isMainnet,
      }),
    {
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    setValue('quorum', quorum);
  }, [quorum]);

  useEffect(() => {
    if (
      contractWriteFunctions &&
      contractWriteFunctions.length &&
      !functionNames.length
    ) {
      setError('targetContract', {
        message: { text: 'noSelectedContractFunctions' } as unknown as string,
      });
    } else if (targetContract) {
      trigger('targetContract');
    }
  }, [contractWriteFunctions, functionNames]);

  useEffect(() => {
    append({ owner: account || '', weight: 1 });
  }, []);

  useEffect(() => {
    setFunctionNames([]);
    setValue('functionNames', []);
  }, [targetContract, isMainnet]);

  const getOwner = () =>
    fields.map((ownerItem, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${ownerItem}-${index}`}>
        <div>
          <S.ContentOwners
            position={errors.owners?.[index]?.owner?.message ? 'center' : 'end'}
          >
            <Input
              key={ownerItem.id}
              {...register(`owners.${index}.owner`, {
                onChange: (e) => {
                  fields[index].owner = e.target.value;
                },
              })}
              autoComplete="off"
              required
              error={errors.owners?.[index]?.owner?.message}
              label={t('partnerAddress')}
              placeholder={t('partnerAddress')}
              popover={t('popoverInfo.multisig.partnerAddress')}
              defaultValue={ownerItem?.owner}
              disabled={allFieldsDisabled}
            />
            {fields.length > 1 && (
              <Button
                onClick={() => {
                  remove(index);
                }}
                theme="danger"
                css={{
                  width: '46px',
                  height: '46px',
                  margin: '0 0 0 9px !important',
                  alignItems: 'center',
                }}
              >
                <S.Failed>
                  <Cross1Icon />
                </S.Failed>
              </Button>
            )}
          </S.ContentOwners>
        </div>
        <S.ContentOwners
          position={errors.owners?.[index]?.weight?.message ? 'center' : 'end'}
        >
          <NumberInput
            key={ownerItem.id}
            {...register(`owners.${index}.weight`, {
              valueAsNumber: true,
              onChange: (e) => {
                fields[index].weight = +e.target.value;
              },
            })}
            error={errors.owners?.[index]?.weight}
            noButtons
            disabled={allFieldsDisabled}
            required
            label={t('partnerVoice')}
            placeholder={t('partnerVoice')}
            popover={t('popoverInfo.multisig.partnerVoice')}
            defaultValue={String(ownerItem.weight)}
          />
          <S.PercentValue>%</S.PercentValue>
        </S.ContentOwners>
      </div>
    ));

  const addNewOwner = () => {
    const owner: MultisigOwner = {
      owner: '',
      weight: 1,
    };
    append(owner);
  };

  return (
    <>
      <S.Content>
        <S.Title>{t('titleContract')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          ({nameContract})
        </S.Title>
        <S.DaoFields>
          <S.ContentInputs direction="vertical" size="big">
            <Input
              {...register('name')}
              autoComplete="off"
              required
              label={t('multisigName')}
              placeholder={t('multisigName')}
              popover={t('popoverInfo.multisig.name')}
              disabled={allFieldsDisabled}
              error={errors.name?.message}
            />

            <Input
              required
              {...register('targetContract')}
              autoComplete="off"
              label={t('targetContract')}
              value={targetContract}
              onChange={(e) => {
                setTargetContract(e.target.value);
                setValue('targetContract', e.target.value);
                trigger('targetContract');
              }}
              placeholder={t('targetContract')}
              popover={t('popoverInfo.multisig.targetContract')}
              disabled={allFieldsDisabled}
              error={errors.targetContract?.message}
            />
            {TESTNET_ONLY_NETWORKS.includes(selectedBlockchain) ? null : (
              <Switch
                disabled={allFieldsDisabled}
                label={t('searchContract', {
                  net: isMainnet ? 'Mainnet' : 'Testnet',
                })}
                checked={isMainnet}
                onCheckedChange={setIsMainnet}
              />
            )}
            {(contractWriteFunctions || []).length ? (
              <MainS.AdvancedTitle>
                {t('contractFunctions')}
              </MainS.AdvancedTitle>
            ) : null}
            <MainS.Options
              size="small"
              style={
                (contractWriteFunctions || []).length
                  ? { border: '1px solid var(--colors-border)', padding: 8 }
                  : {}
              }
            >
              {(contractWriteFunctions || []).map(
                (contractFunction: string) => (
                  <TokenTag
                    key={contractFunction}
                    disabled={allFieldsDisabled}
                    isActive={functionNames.includes(contractFunction)}
                    onClick={() => {
                      let updatedFunctionNames = [
                        ...functionNames,
                        contractFunction,
                      ];
                      if (functionNames.includes(contractFunction)) {
                        updatedFunctionNames = functionNames.filter(
                          (name) => name !== contractFunction
                        );
                      }
                      setFunctionNames(updatedFunctionNames);
                      setValue('functionNames', updatedFunctionNames);
                    }}
                  >
                    {contractFunction}
                  </TokenTag>
                )
              )}
            </MainS.Options>
          </S.ContentInputs>
          <Text weight="middle" size="big">
            {t('setUpPartnersAndShares')}
          </Text>
          <S.ContentInputs direction="vertical" size="big">
            {fields.length !== 0 && getOwner()}
          </S.ContentInputs>
          <Button
            onClick={addNewOwner}
            theme="secondary"
            css={{ width: '100%', margin: '0 0 24px 0' }}
          >
            {t('addPartner')}
          </Button>
          <Text weight="middle" size="big">
            {t('setUpQuorum')}
          </Text>
          <div>
            <Text popover={t('popoverInfo.multisig.quorum')}>
              {t('quorum')}
            </Text>
            <SliderWithInputComponent
              allFieldsDisabled={allFieldsDisabled}
              value={quorum}
              setValue={setQuorum}
            />
          </div>
        </S.DaoFields>
        <Divider />
        <Space direction="vertical" size="middle">
          <S.AdvancedTitle>{t('options')}</S.AdvancedTitle>
          <MainS.Options size="small">
            <CreateAiFunctionTag
              allFieldsDisabled={allFieldsDisabled}
              type={ContractType.multisigContract}
            />
          </MainS.Options>
        </Space>
        <MainS.Advanced type="multiple" defaultValue={['1', '5']}>
          <CreateTokenAiOption
            allFieldsDisabled={allFieldsDisabled}
            type={ContractType.multisigContract}
            clearErrors={clearErrors}
            error={errors.options?.aiFunction?.message}
          />
        </MainS.Advanced>
      </S.Content>
      <MainS.DividerWrapper>
        <Divider />
      </MainS.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions}
        type={ContractType.multisigContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
