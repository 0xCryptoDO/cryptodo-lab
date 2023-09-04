import { isAddress } from 'ethers/lib/utils';
import * as yup from 'yup';

import { FieldErrors } from '@/types';
import {
  nameValidation,
  symbolValidation,
} from '@/views/CreateToken/utils/nameValidationRegExp';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

export const createERC721TokenFormValidation = yup.object({
  contractName: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) => nameValidation.test(value),
    })
    .max(25, { text: FieldErrors.MaxLength, max: 25 }),
  totalSupply: yup
    .number()
    .integer({ text: FieldErrors.Integer })
    .required({ text: FieldErrors.Required })
    .min(1, { text: FieldErrors.Min, min: 1 }),
  name: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) => nameValidation.test(value),
    })
    .max(25, { text: FieldErrors.MaxLength, max: 25 }),
  symbol: yup
    .string()
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
  tokenPerTx: yup
    .number()
    .strict()
    .integer({ text: FieldErrors.Integer })
    .required({ text: FieldErrors.Required })
    .min(1, { text: FieldErrors.Min, min: 1 }),
  tokenPerWallet: yup
    .number()
    .integer({ text: FieldErrors.Integer })
    .required({ text: FieldErrors.Required })
    .min(1, { text: FieldErrors.Min, min: 1 }),
  price: yup
    .number()
    .strict()
    .required({ text: FieldErrors.Required })
    .min(0, { text: FieldErrors.Min, min: 0 }),
  timeForReveal: yup
    .date()
    .required({ text: FieldErrors.Required })
    .min(new Date(), { text: FieldErrors.ErrorDate }),
  uri: yup.string().required({ text: FieldErrors.Required }),
  owner: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'initialOwner',
      message: { text: FieldErrors.ETHAddress },
      test: (value: any) => isAddress(value),
    }),
  founder: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'initialOwner',
      message: { text: FieldErrors.ETHAddress },
      test: (value: any) => isAddress(value),
    }),
  options: yup.object({
    incrementTokenMaxAmount: yup.boolean().optional(),
    presale: yup.boolean().optional(),
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
