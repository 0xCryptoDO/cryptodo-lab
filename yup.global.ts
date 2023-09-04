import { Flags, Schema } from 'yup';

declare module 'yup' {
  interface ArraySchema<
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends Flags = ''
  > extends Schema<TIn, TContext, TDefault, TFlags> {
    uniquePartnerAddress(message: string): this;
    uniqueOwner(message: string): this;
  }
}
