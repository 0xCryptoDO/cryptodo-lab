import * as Yup from 'yup';
import { FieldErrors } from '@/types';

export const createVotingValidation = Yup.object({
  name: Yup.string().required({ text: FieldErrors.Required }),
  symbol: Yup.string()
    .required({ text: FieldErrors.Required })
    .min(3, { text: FieldErrors.Min, min: 2 })
    .max(5, { text: FieldErrors.Max, max: 5 })
    .uppercase({ text: FieldErrors.UpperCase })
    .strict(),
  title: Yup.string().required({ text: FieldErrors.Required }),
  description: Yup.string(),
});
