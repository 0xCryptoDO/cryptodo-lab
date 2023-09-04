import { DeepMap, FieldError, FieldValues } from "react-hook-form";

export type FieldErrors<
  TFieldValues extends FieldValues = FieldValues
  > = DeepMap<TFieldValues, FieldError>;