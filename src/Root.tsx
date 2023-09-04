import { FC, ReactNode, useEffect, useState } from 'react';
import { useMedia, useMountedState } from 'react-use';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useEthers } from '@cryptodo/frontend-sdk';

import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { setToken } from '@/reduxStore/slices/auth/authSlice';
import { toggleConnectDialog } from '@/reduxStore/slices/ui/ui.slice';

import {
  Button,
  Dialogs,
  Header,
  Sidebar,
  SignMessageDialog,
  Space,
  ThemedToastContainer,
} from './components';
import { usePersistLocaleCookie, useReusable } from './hooks';
import unprotectedRoutes from './routes/unprotected';
import { darkTheme, Main } from './styles';

type RootProps = {
  children: ReactNode;
};

export const Root: FC<RootProps> = ({ children }) => {
  const token = useTypedSelector((state) => state.auth.token);
  
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isHeaderOpened, setIsHeaderOpened] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [showedConnectDialog, setShowedConnectDialog] =
    useState(false);
  const [isAppConfigured, setIsAppConfigured] = useState(false);
  
  const { account, isLoading } = useEthers();
  const dispatch = useTypedDispatch();
  const isMounted = useMountedState();
  const { t } = useTranslation('common');
  const { setMessageToSign } = useReusable();
  const isDesktop = useMedia('(min-width: 769px)', false);
  const router = useRouter();
  const { pathname, query, isReady } = router;

  usePersistLocaleCookie();
  
  useEffect(() => {
    if (isAppConfigured && !token && isReady) {
      let url = '/';
      if (query.ref) {
        url = '/quests';
      }
      router.push(url, {
        pathname: url,
        query: query.ref ? { ref: query.ref } : {},
      });
    }
  }, [isAppConfigured, token, isReady]);

  useEffect(() => {
    if (!account && token && !isLoading) {
      dispatch(setToken(''))
    }
  }, [token, account, isLoading]);

  useEffect(() => {
    const sidebarOpened = localStorage.getItem('sidebarOpened');

    if (sidebarOpened && !JSON.parse(sidebarOpened)) {
      setIsSidebarOpened(false);

      setTimeout(() => {
        setIsTransition(true);
      }, 300);
    } else {
      setIsTransition(true);
    }
  }, []);

  useEffect(() => {
    const handleCloseHeader = () => {
      const body = document.querySelector('body');

      setIsHeaderOpened(false);
      body?.classList.remove('overflow-hidden');
    };

    router.events.on('routeChangeStart', handleCloseHeader);

    return () => {
      router.events.off('routeChangeStart', handleCloseHeader);
    };
  }, [router]);

  const isProtected = !unprotectedRoutes.includes(pathname);
  const isRouteRestricted = isProtected && (!token || !account);
  useEffect(() => {
    if (isRouteRestricted && !showedConnectDialog) {
      setShowedConnectDialog(true);
      dispatch(toggleConnectDialog(true));
    } else {
      dispatch(toggleConnectDialog(false));
    }
    setIsAppConfigured(true);
  }, [isProtected, token, account]);

  const handleClick = () => {
    dispatch(toggleConnectDialog(true));
  };

  const getUiForMobile = () => {
    if (!account && !isDesktop) {
      return (
        <Button
          onClick={handleClick}
          theme={account ? 'secondaryDark' : 'primary'}
        >
          {t('connectWallet')}
        </Button>
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}
      >
        <Space size="large" direction="vertical" align="center">
          <div>{t('walletNotConnected')}</div>
          <Button
            onClick={handleClick}
            theme={account ? 'secondaryDark' : 'primary'}
          >
            {t('connectWallet')}
          </Button>
        </Space>
      </div>
    );
  };

  // Avoid hydration mismatch (ThemeProvider)
  if (!isMounted()) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        light: 'light',
        dark: darkTheme.className,
      }}
    >
      <Header
        isOpened={isHeaderOpened}
        setIsOpened={setIsHeaderOpened}
        isDesktop={isDesktop}
      />
      {isDesktop && (
        <Sidebar
          isOpened={isSidebarOpened}
          setIsOpened={setIsSidebarOpened}
          isTransition={isTransition}
        />
      )}
      <Main isSidebarOpened={isSidebarOpened} isTransition={isTransition}>
        {isProtected && (!token || !account) ? getUiForMobile() : children}
      </Main>
      <Dialogs />
      <SignMessageDialog setMessageToSign={setMessageToSign} />
      <ThemedToastContainer />
    </ThemeProvider>
  );
};
