import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';

export const buildApi = (prefixUrl: string, errorHandler?: any) => {
  const { t } = useTranslation('common');
  const api = axios.create({
    baseURL: prefixUrl,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      if (error?.response?.status === 401) {
        if (errorHandler) {
          await errorHandler();
        }
      }
      const response = (await error?.response?.data) as any;
      if (response) {
        error.message =
          response?.message instanceof Array
            ? response.message[0]
            : response.message || response.error;
        if (error.message === 'Unauthorized') {
          error.message = t('axiosErrors.unauthorized');
          toast.warning(error.message);
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error(`Bad gateway ${error.config?.baseURL}, ${error?.message}`);
      }
      throw error;
    }
  );

  return api;
};
