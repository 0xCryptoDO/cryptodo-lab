import { isAddress } from 'ethers/lib/utils';
import * as yup from 'yup';
import { FieldErrors } from '@/types';
import {
  nameValidation,
} from '@/views/CreateToken/utils/nameValidationRegExp';
import { MultisigOwner } from '@/views/CreateTokenPage/contractComponents/CreateMultisig/types/multisigOwner.interface';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

// eslint-disable-next-line func-names
yup.addMethod(yup.array, 'uniqueOwner', function (message) {
  // eslint-disable-next-line func-names
  return this.test('uniqueOwner', '', function (list: MultisigOwner[] | undefined) {
    const errors: string | yup.ValidationError | yup.ValidationError[] = [];
    if (list) {
      list.forEach((item, index) => {
        const filtered = list.filter((el) => el.owner === item.owner).length > 1;

        if (item.owner && filtered) {
          errors.push(
            this.createError({
              path: `${this.path}.${index}.owner`,
              message: { text: message },
            })
          );
        }
      });
    }

    if (errors.length > 0) {
      throw new yup.ValidationError(errors);
    }

    return true;
  });
});

const validateFieldsArray = {
  owner: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'name',
      message: { text: FieldErrors.ETHAddress },
      test: (value: any) => isAddress(value),
    }),
  weight: yup
    .number()
    .min(0.001, { text: FieldErrors.Min, min: 0.001 })
    .max(100, { text: FieldErrors.Max, max: 100 })
    .required({ text: FieldErrors.Required }),
};


export const createMultisigTokenFormValidation = yup.object({
  targetContract: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      message: { text: FieldErrors.IsContractAddress },
      test: (value: any) => value && isAddress(value)
    }),
  name: yup
    .string()
    .required({ text: FieldErrors.Required })
    .min(3, { text: FieldErrors.MinLength, min: 3 })
    .max(25, { text: FieldErrors.MaxLength, max: 25 })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) =>
        nameValidation.test(value) && Number.isNaN(parseInt(value?.length ? value[ 0 ] : '', 10)),
    }),
  owners: yup
    .array()
    .of(yup.object().shape(validateFieldsArray))
    .uniqueOwner('elementExist'),
  options: yup.object({
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
