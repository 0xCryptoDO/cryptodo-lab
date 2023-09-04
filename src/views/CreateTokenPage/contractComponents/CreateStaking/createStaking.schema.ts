import * as yup from 'yup';
import { isAddress } from 'ethers/lib/utils';

import { FieldErrors } from '@/types';
import { nameValidation } from '@/views/CreateToken/utils/nameValidationRegExp';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

export const createStakingTokenFormValidation = yup.object({
  name: yup
    .string()
    .required({ text: FieldErrors.Required })
    .min(3, { text: FieldErrors.MinLength, min: 3 })
    .max(25, { text: FieldErrors.MaxLength, max: 25 })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) =>
        nameValidation.test(value) &&
        Number.isNaN(parseInt(value?.length ? value[0] : '', 10)),
    }),
  token: yup
    .string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'token',
      message: { text: FieldErrors.OnlyEthAddress },
      test: (value: any) => value === '' || isAddress(value),
    }),
  minStake: yup
    .number()
    .integer({ text: FieldErrors.Integer })
    .min(1, { text: FieldErrors.Min, min: 1 })
    .required({ text: FieldErrors.Required }),
  maxStake: yup
    .number()
    .integer({ text: FieldErrors.Integer })
    .min(1, { text: FieldErrors.Min, min: 1 })
    .required({ text: FieldErrors.Required }),
  tariffs: yup
    .array()
    .of(
      yup
        .object({
          period: yup
            .number()
            .integer({ text: FieldErrors.Integer })
            .required({ text: FieldErrors.Required })
            .min(1, { text: FieldErrors.Min, min: 1 }),
          percentage: yup
            .number()
            .integer({ text: FieldErrors.Integer })
            .required({ text: FieldErrors.Required })
            .min(1, { text: FieldErrors.Min, min: 1 }),
        })
        .required()
    )
    .required(),
  options: yup.object({
    aiFunction: getAiFunctionValidationUtil(),
    penalty: yup
      .number()
      .integer({ text: FieldErrors.Integer })
      .min(1, { text: FieldErrors.Min, min: 1 })
      .max(100, { text: FieldErrors.Max, max: 100 }),
  }),
});
