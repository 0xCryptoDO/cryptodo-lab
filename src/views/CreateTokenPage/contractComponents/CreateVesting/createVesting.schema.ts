import { addMethod, array, number, object, string, ValidationError } from 'yup';
import { isAddress } from 'ethers/lib/utils';

import { FieldErrors } from '@/types';
import { nameValidation } from '@/views/CreateToken/utils/nameValidationRegExp';
import { VestingPartner } from '@/views/CreateTokenPage/contractComponents/CreateVesting/types/vestingPartner.interface';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

// eslint-disable-next-line func-names
addMethod(array, 'uniquePartnerAddress', function (message) {
  return this.test(
    'uniquePartnerAddress',
    '',
    // eslint-disable-next-line func-names
    function (list: VestingPartner[] | undefined) {
      const errors: string | ValidationError | ValidationError[] = [];
      if (list) {
        list.forEach((item, index) => {
          const filtered =
            list.filter((el) => el.partnerAddress === item.partnerAddress)
              .length > 1;

          if (item.partnerAddress && filtered) {
            errors.push(
              this.createError({
                path: `${this.path}.${index}.partnerAddress`,
                message: { text: message },
              })
            );
          }
        });
      }

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }

      return true;
    }
  );
});

const validateFieldsArray = {
  partnerAddress: string()
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

export const createVestingTokenFormValidation = object({
  name: string()
    .required({ text: FieldErrors.Required })
    .min(3, { text: FieldErrors.MinLength, min: 3 })
    .max(25, { text: FieldErrors.MaxLength, max: 25 })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: string | undefined) =>
        nameValidation.test(value as string) &&
        Number.isNaN(parseInt(value?.length ? value[0] : '', 10)),
    }),
  token: string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'token',
      message: { text: FieldErrors.OnlyEthAddress },
      test: (value: any) => value === '' || isAddress(value),
    }),
  partners: array()
    .of(object().shape(validateFieldsArray))
    .uniquePartnerAddress('elementExist'),
  lockDuration: number()
    .integer({ text: FieldErrors.Integer })
    .required({ text: FieldErrors.Required })
    .min(0, { text: FieldErrors.Min, min: 0 }),
  options: object({
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
