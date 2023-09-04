import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';

export const ThemedToastContainer = () => {
  const { theme } = useTheme();

  return <ToastContainer theme={theme as 'light' | 'dark'} />;
};
