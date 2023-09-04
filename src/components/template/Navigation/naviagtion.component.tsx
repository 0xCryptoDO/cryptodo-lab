import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {
  DoubleArrowRightIcon,
  DoubleArrowLeftIcon,
  ExitIcon,
} from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

import { useEthers, shortenIfAddress } from '@cryptodo/frontend-sdk';

import { Button, Space } from '@/components';
import {
  SidebarPlusIcon,
  GitbookIcon,
  ProfileIcon,
  SmartContractIcon,
  DappsGalleryIcon,
} from '@/assets/icons';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import {
  toggleConnectDialog,
  toggleCreateTokenDialog,
} from '@/reduxStore/slices/ui/ui.slice';

import { LinkItem, NavigationProps } from './navigation.types';
import { NavListItem } from './components';
import * as S from './navigation.style';

export const Navigation: FC<NavigationProps> = ({
  navOpened,
  toggleNav,
  mobile,
  logout,
}) => {
  const token = useTypedSelector((state) => state.auth.token);

  const dispatch = useTypedDispatch();
  const { account } = useEthers();
  const { t } = useTranslation('common');
  const { pathname } = useRouter();

  const handleConnectDialogOpen = useCallback(() => {
    if (!account) {
      toggleNav();
      dispatch(toggleConnectDialog(true));
    } else {
      navigator.clipboard.writeText(account);
      toast(t('addressCopied') as string);
    }
  }, [account]);

  const handleCreateContract = () => {
    if (!account) {
      return;
    }
    dispatch(toggleCreateTokenDialog(true));

    if (mobile) {
      toggleNav();
    }
  };

  const topLinks: LinkItem[] = [
    {
      href: '/',
      label: 'smartContracts',
      icon: <SmartContractIcon />,
      action: () => {
        if (mobile) {
          toggleNav();
        }
      },
    },
    {
      label: 'createContract',
      icon: <SidebarPlusIcon />,
      action: handleCreateContract,
      isAuthorizedRoute: true,
    },
    {
      href: 'https://docs.cryptodo.app/',
      label: 'DOCS',
      icon: <GitbookIcon />,
      blank: true,
      css: {
        textDecoration: 'none',
      },
      action: () => {
        if (mobile) {
          toggleNav();
        }
      },
    },
    // {
    //   href: '/quests',
    //   label: 'quests',
    // icon: <QuestsIcon />,
    //   action: () => {
    //     if (mobile) {
    //       toggleNav();
    //     }
    //   },
    // },
    {
      href: '/dappsGallery',
      label: 'dappsGallery',
      icon: <DappsGalleryIcon />,
      action: () => {
        if (mobile) {
          toggleNav();
        }
      },
    },
  ];
  const bottomLinks: LinkItem[] = [
    {
      isAuthorizedRoute: true,
      href: '/profile',
      label: 'profile',
      icon: <ProfileIcon />,
      action: () => {
        if (mobile) {
          toggleNav();
        }
      },
    },
    {
      action: () => {
        toggleNav();
      },
      label: 'collapseSidebar',
      icon: navOpened ? (
        <DoubleArrowLeftIcon color="white" />
      ) : (
        <DoubleArrowRightIcon color="white" />
      ),
      css: {
        '@tablet': {
          display: 'none',
        },
      },
    },
  ];

  if (mobile && account && token) {
    const exit = {
      label: 'exit',
      icon: <ExitIcon />,
      action: () => {
        logout?.();
        toggleNav();
      },
    };
    bottomLinks.push(exit);
  }

  const getIsLinkActive = (link: LinkItem): boolean => {
    if (link.alwaysDisabled) {
      return false;
    }

    return !!(
      link.href === pathname ||
      (link.activeUrls && link.activeUrls.find((url) => url === pathname))
    );
  };

  return (
    <S.Navigation>
      <S.NavList>
        <S.NavListTop>
          {topLinks
            .filter((link) =>
              account && token ? true : !link.isAuthorizedRoute
            )
            .map((item) => {
              const isActive = getIsLinkActive(item);
              return (
                <NavListItem key={item.label} item={item} isActive={isActive} />
              );
            })}
        </S.NavListTop>
        <S.NavListBottom>
          {bottomLinks
            .filter((link) =>
              account && token ? true : !link.isAuthorizedRoute
            )
            .map((item) => {
              const isActive = getIsLinkActive(item);
              return (
                <NavListItem key={item.label} item={item} isActive={isActive} />
              );
            })}
        </S.NavListBottom>
        <S.ConnectWalletButton>
          <Space>
            <Button size="large" stretch onClick={handleConnectDialogOpen}>
              {account && token
                ? shortenIfAddress(account)
                : t('connectWallet')}
            </Button>
          </Space>
        </S.ConnectWalletButton>
      </S.NavList>
    </S.Navigation>
  );
};
