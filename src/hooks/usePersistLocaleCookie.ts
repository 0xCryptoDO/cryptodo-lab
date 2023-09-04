import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const usePersistLocaleCookie = () => {
  const { locale } = useRouter();

  useEffect(() => {
    const date = new Date();
    const expireMs = 100 * 24 * 60 * 60 * 1000; // 100 days

    date.setTime(date.getTime() + expireMs);

    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
  }, [locale]);
};
