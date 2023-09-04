import { ContractType } from '@cryptodo/contracts';

import { RootState, store } from '@/reduxStore/store';
import { changeForm } from '@/views/CreateToken/redux/createToken.slice';

const changeFormOptions = (type: ContractType, payload: any) => {
  const currentOptions = (store.getState() as RootState).createToken[type]
    .options;

  store.dispatch(
    changeForm({
      data: {
        options: {
          ...currentOptions,
          ...payload,
        },
      },
      type,
    })
  );
};

export { changeFormOptions };
