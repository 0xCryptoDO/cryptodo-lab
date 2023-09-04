import * as yup from 'yup';
import { FieldErrors } from '@/types';

export const getAiFunctionValidationUtil = () => yup
    .string()
    .optional()
    .min(50, { text: FieldErrors.MinLength, min: 50 })
