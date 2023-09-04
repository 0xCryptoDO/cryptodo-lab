import * as Yup from 'yup';
import { FieldErrors } from '@/types';
import { nameValidation } from '@/views/CreateToken/utils/nameValidationRegExp';
import { getAiFunctionValidationUtil } from '@/views/CreateToken/utils/getAiFunctionValidation.util';

export const createAirDropTokenFormValidation = Yup.object({
  name: Yup.string()
    .required({ text: FieldErrors.Required })
    .test({
      name: 'contractName',
      message: { text: FieldErrors.OnlyEnglishChars },
      test: (value: any) => nameValidation.test(value),
    })
    .max(25, { text: FieldErrors.MaxLength, max: 25 }),
  initialOwner: Yup.string().required(),
  options: Yup.object({
    aiFunction: getAiFunctionValidationUtil(),
  }),
});
