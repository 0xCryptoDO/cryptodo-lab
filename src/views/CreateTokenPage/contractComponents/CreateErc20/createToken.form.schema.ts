import { isAddress } from 'ethers/lib/utils';
import * as yup from 'yup';
import {
  nameValidation,
  numberValidation,
  symbolValidation,
} from '@/views/CreateToken/utils/nameValidationRegExp';
import { FieldErrors } from '@/types';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

export const createTokenFormValidation = yup.object({
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
    .test({
      name: 'symbol',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) => symbolValidation.test(value),
    }),
  totalSupply: yup
    .number()
    .required({ text: FieldErrors.Required })
    .min(1, { text: FieldErrors.Min, min: 1 })
    .integer({ text: FieldErrors.Integer })
    .test({
      name: 'number',
      test: (value: any) => numberValidation.test(value),
    }),
  decimals: yup
    .number()
    .integer({ text: FieldErrors.Integer })
    .required({ text: FieldErrors.Required })
    .min(1, { text: FieldErrors.Min, min: 1 })
    .max(18, { text: FieldErrors.Max, max: 18 }),
  initialOwner: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'initialOwner',
      message: { text: FieldErrors.ETHAddress },
      test: (value: any) => isAddress(value),
    }),
  options: yup.object({
    mint: yup
      .object({
        cap: yup
          .number()
          .integer({ text: FieldErrors.Integer })
          .min(1, { text: FieldErrors.Min, min: 1 })
          .optional(),
      })
      .optional(),
    burn: yup.boolean().optional(),
    blacklist: yup.boolean().optional(),
    pause: yup.boolean().optional(),
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
