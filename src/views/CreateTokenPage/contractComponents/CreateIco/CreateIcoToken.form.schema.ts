import { isAddress } from 'ethers/lib/utils';
import * as yup from 'yup';
import { FieldErrors } from '@/types';
import { nameValidation } from '@/views/CreateToken/utils/nameValidationRegExp';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

export const createIcoTokenFormValidation = yup.object({
  name: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) => nameValidation.test(value),
    })
    .max(25, { text: FieldErrors.MaxLength, max: 25 }),
  token: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'token',
      message: { text: FieldErrors.OnlyEthAddress },
      test: (value: any) => value === '' || isAddress(value),
    }),
  price: yup
    .string()
    .test({
      name: 'price',
      message: { text: FieldErrors.MoreThan, min: 0 },
      test: (value: any) => +value > 0,
    })
    .required({ text: FieldErrors.Required }),
  lockup: yup
    .number()
    .integer({ text: FieldErrors.Integer })
    .required({ text: FieldErrors.Required })
    .min(0, { text: FieldErrors.Min, min: 0 }),
  maxPerWallet: yup
    .number()
    .required({ text: FieldErrors.Required })
    .min(1, { text: FieldErrors.Min, min: 1 }),
  owner: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'initialOwner',
      message: { text: FieldErrors.ETHAddress },
      test: (value: any) => isAddress(value),
    }),
  receiverAddress: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'fundsReceiverAddress',
      message: { text: FieldErrors.ETHAddress },
      test: (value: any) => isAddress(value),
    }),
  options: yup.object({
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
