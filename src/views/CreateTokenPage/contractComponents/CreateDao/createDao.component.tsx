import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { ContractType } from '@cryptodo/contracts';

import { DeployConfirmation, Divider, Input, SliderWithInputComponent, Text } from '@/components';
import { BaseCreateContractProps } from '@/views/CreateToken/types/baseCreateContractProps';
import { CreateTokenPricing } from '@/views/CreateToken/components';
import { computedGT } from '@/utils/computedGT';
import {
  CreateDaoPartner,
} from '@/views/CreateTokenPage/contractComponents/CreateDao/components/CreateDaoPartner/createDaoPartner';

import { useDao } from './hooks';
import * as S from './createDao.page.style';

export const CreateDao: FC<BaseCreateContractProps> = (props) => {
  const {
    nameContract,
    allFieldsDisabled,
    handleOpenModal,
    toggleDeployConfirmationDialog,
    deployConfirmationOpen,
    confirm,
    isTestnet,
  } = props;

  const {
    setValue,
    handleSubmit,
    register,
    errors,
    getFormData,
    trigger,
    formOptions,
    watch,
    quorum,
    setQuorum,
    addNewPartner,
    removePartner,
    partners,
  } = useDao(handleOpenModal);

  const { t } = useTranslation('CreateToken');

  const updatePartners = watch('partners');

  const getPartner = () => {
    const computedGTAmount = computedGT(partners);
    return partners.map((partner, index) => (
      <CreateDaoPartner
        key={partner.id}
        partner={partner}
        index={index}
        errors={errors}
        allFieldsDisabled={allFieldsDisabled}
        register={register}
        computedGTAmount={computedGTAmount}
        fields={partners}
        remove={removePartner}
        updatePartners={updatePartners}
      />
    ));
  };

  return (
    <>
      <S.Content>
        <S.Title>{t('titleContract')}</S.Title>
        <S.Title color="gray" margin="left" size="small">
          ({nameContract})
        </S.Title>
        <S.DaoFields>
          <Text weight="middle" size="big">
            {t('nameYouDao')}
          </Text>
          <S.ContentInputs direction="vertical" size="big">
            <Input
              {...register('name')}
              autoComplete="off"
              required
              label={t('daoName')}
              placeholder={t('daoName')}
              disabled={allFieldsDisabled}
              error={errors.name?.message}
              popover={t('popoverInfo.dao.name')}
            />
            <Input
              required
              {...register('symbol')}
              onChange={({ target }) => {
                setValue('symbol', target.value.toUpperCase());
                trigger('symbol');
              }}
              autoComplete="off"
              label={t('symbol')}
              placeholder={t('symbol')}
              disabled={allFieldsDisabled}
              error={errors.symbol?.message}
              popover={t('popoverInfo.dao.symbol')}
            />
          </S.ContentInputs>
          <Text weight="middle" size="big">
            {t('setUpPartnersAndShares')}
          </Text>
          <S.ContentInputs direction="vertical" size="big">
            {partners.length !== 0 && getPartner()}
          </S.ContentInputs>
          <S.AddPartnerButton onClick={addNewPartner} theme="secondary">
            {t('addPartner')}
          </S.AddPartnerButton>
          <Text weight="middle" size="big" popover={t('popoverInfo.dao.quorum')}>
            {t('setUpQuorum')}
          </Text>
          <div>
            <Text>{t('quorum')}</Text>
            <SliderWithInputComponent
              value={quorum}
              setValue={setQuorum}
              allFieldsDisabled={allFieldsDisabled}
            />
          </div>
        </S.DaoFields>
      </S.Content>
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
      <CreateTokenPricing
        handleSubmit={handleSubmit}
        options={formOptions}
        type={ContractType.daoContract}
      />
      <DeployConfirmation
        open={deployConfirmationOpen}
        toggle={toggleDeployConfirmationDialog}
        submit={() => confirm(getFormData(), isTestnet)}
      />
    </>
  );
};
