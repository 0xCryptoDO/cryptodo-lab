import { FC } from 'react';

import { Dialog, Loader } from '@/components';
import { useTypedSelector } from '@/reduxStore';

export const AppLoader: FC = () => {
  const appLoading = useTypedSelector((state) => state.ui.appLoading);

  return (
    <Dialog open={appLoading.is} css={{ padding: '1.5rem 1.5rem 2rem' }}>
      <Loader center />
      {appLoading.message && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>{appLoading.message}</div>
      )}
    </Dialog>
  );
};
