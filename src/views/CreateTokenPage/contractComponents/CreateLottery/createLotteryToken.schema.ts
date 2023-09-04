import * as Yup from 'yup';
import { FieldErrors } from '@/types';
import { nameValidation } from '@/views/CreateToken/utils/nameValidationRegExp';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

export const createLotteryTokenFormValidation = Yup.object({
  name: Yup.string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'name',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) => nameValidation.test(value),
    })
    .max(25, { text: FieldErrors.MaxLength, max: 25 }),
  description: Yup.string()
    .optional()
    .max(300, { text: FieldErrors.MaxLength, max: 300 }),
  ticketsPriceOrLotteryPool: Yup.number()
    .typeError({ text: FieldErrors.Required })
    .positive({ text: FieldErrors.Positive }),
  ticketsAmount: Yup.number()
    .integer({ text: FieldErrors.Integer })
    .typeError({ text: FieldErrors.Required })
    .required({ text: FieldErrors.Required })
    .min(10, { text: FieldErrors.Min, min: 10 }),
  startTime: Yup.date()
    .required({ text: FieldErrors.Required })
    .typeError({ text: FieldErrors.Required })
    .min(new Date(), { text: FieldErrors.ErrorDate }),
  endTime: Yup.date()
    .required({ text: FieldErrors.Required })
    .typeError({ text: FieldErrors.Required })
    .min(Yup.ref('startTime'), { text: FieldErrors.ErrorEndDate }),
  ownerFee: Yup.number()
    .required({ text: FieldErrors.Required })
    .min(0, { text: FieldErrors.Min, min: 0 })
    .max(30, { text: FieldErrors.Max, max: 30 }),
  options: Yup.object({
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
