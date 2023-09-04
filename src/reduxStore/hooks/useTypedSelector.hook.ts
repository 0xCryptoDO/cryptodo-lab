import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/reduxStore/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
