import { ChangeEvent, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Cross1Icon } from '@radix-ui/react-icons';

import { Button, Input, NumberInput, Space } from '@/components';
import { calcPercent } from '@/utils/computedGT';

import { CreateDaoPartnerProps } from './createDaoPartner.types';
import * as S from '../../createDao.page.style';

export const CreateDaoPartner: FC<CreateDaoPartnerProps> = (props) => {
  const {
    partner,
    index,
    errors,
    allFieldsDisabled,
    register,
    fields,
    remove,
    computedGTAmount,
    updatePartners,
  } = props;

  const { t } = useTranslation('CreateToken');

  return (
    <Space direction="vertical">
      <S.ContentPartners
        position={
          errors.partners?.[index]?.partnerAddress?.message ? 'center' : 'end'
        }
      >
        <Input
          key={partner.id}
          {...register(`partners.${index}.partnerAddress`, {
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              fields[index].partnerAddress = e.target.value;
            },
          })}
          autoComplete="off"
          required
          error={errors.partners?.[index]?.partnerAddress?.message}
          label={t('partnerAddress')}
          placeholder={t('partnerAddress')}
          defaultValue={partner?.partnerAddress}
          disabled={allFieldsDisabled}
          popover={t('popoverInfo.dao.partnerAddress')}
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
      </S.ContentPartners>
      <S.ContentPartners
        position={
          errors.partners?.[index]?.GTAmount?.message ? 'center' : 'end'
        }
      >
        <NumberInput
          key={partner.id}
          {...register(`partners.${index}.GTAmount`, {
            valueAsNumber: true,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              fields[index].GTAmount = +e.target.value;
            },
          })}
          error={errors.partners?.[index]?.GTAmount}
          noButtons
          disabled={allFieldsDisabled}
          required
          label={t('gtAmount')}
          placeholder={t('gtAmount')}
          popover={t('popoverInfo.dao.gtAmount')}
          defaultValue={partner.GTAmount}
        />
        <S.PercentValue>
          {calcPercent(computedGTAmount, updatePartners[index]?.GTAmount)}%
        </S.PercentValue>
      </S.ContentPartners>
    </Space>
  );
};
