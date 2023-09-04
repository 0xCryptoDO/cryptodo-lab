import { isAddress } from 'ethers/lib/utils';
import { addMethod, array, number, object, string, ValidationError } from 'yup';

import { FieldErrors } from '@/types';
import { nameValidation, symbolValidation } from '@/views/CreateToken/utils/nameValidationRegExp';

import { DaoPartner } from './types/daoPartner.interface';

// eslint-disable-next-line func-names
addMethod(array, 'uniquePartnerAddress', function(message) {
  // eslint-disable-next-line func-names
  return this.test('uniquePartnerAddress', '', function(list: DaoPartner[] | undefined) {
    const errors: string | ValidationError | ValidationError[] = [];
    if (list) {
      list.forEach((item, index) => {
        const filtered = list.filter((el) => el.partnerAddress === item.partnerAddress).length > 1;

        if (item.partnerAddress && filtered) {
          errors.push(
            this.createError({
              path: `${this.path}.${index}.partnerAddress`,
              message: { text: message },
            }),
          );
        }
      });
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    return true;
  });
});

const validateFieldsArray = {
  partnerAddress:
    string()
      .required({ text: FieldErrors.Required })
      .test({
        name: 'name',
        message: { text: FieldErrors.ETHAddress },
        test: (value: any) => isAddress(value),
      }),
  GTAmount: number()
    .min(0, { text: FieldErrors.Min, min: 0 })
    .required({ text: FieldErrors.Required }),
};

export const createDaoTokenFormValidation = object({
  name:
    string()
      .required({ text: FieldErrors.Required })
      .min(3, { text: FieldErrors.MinLength, min: 3 })
      .max(25, { text: FieldErrors.MaxLength, max: 25 })
      .test({
        name: 'name',
        message: { text: FieldErrors.OnlyEnglishChars },
        test: (value: any) =>
          nameValidation.test(value) && Number.isNaN(parseInt(value?.length ? value[0] : '', 10)),
      }),
  partners:
    array()
      .required({ text: FieldErrors.Required })
      .of(object().shape(validateFieldsArray))
      .uniquePartnerAddress('elementExist'),
  symbol:
    string()
      .required({ text: FieldErrors.Required })
      .min(3, { text: FieldErrors.MinLength, min: 3 })
      .max(5, { text: FieldErrors.MaxLength, max: 5 })
      .uppercase({ text: FieldErrors.UpperCase })
      .strict()
      .test({
        name: 'symbol',
        message: { text: FieldErrors.OnlyEnglishChars },
        test: (value: any) => symbolValidation.test(value),
      }),
  quorum:
    number()
      .required()
      .min(1, { text: FieldErrors.Min, min: 1 })
      .max(100, { text: FieldErrors.Max, max: 100 }),
});
