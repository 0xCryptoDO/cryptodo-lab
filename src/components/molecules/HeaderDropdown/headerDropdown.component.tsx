import { useCallback } from 'react';
import { useEthers } from '@cryptodo/frontend-sdk';
import { ExitIcon } from '@radix-ui/react-icons';

import { Dropdown } from '@/components';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { toggleDropdown } from '@/reduxStore/slices/ui/ui.slice';
import { removeToken } from '@/reduxStore/slices/auth/authSlice';

import { HeaderDropdownProps } from './headerDropdown.types';

export const HeaderDropdown = (props: HeaderDropdownProps) => {
  const { children } = props;
  
  const headerDropdownOpen = useTypedSelector((state) => state.ui.headerDropdownOpen);

  const dispatch = useTypedDispatch();
  const { account } = useEthers();
  const { deactivate } = useEthers();

  const handleDropdownToggle = useCallback(
    (open: boolean) => {
      if (account) {
        dispatch(toggleDropdown(open));
      }
    },
    [account]
  );

  const dropdownItems = [
    {
      icon: <ExitIcon />,
      label: 'Log out',
      action: () => {
        deactivate();
        dispatch(removeToken());
      },
    },
  ];

  return (
    <Dropdown
      items={dropdownItems}
      open={headerDropdownOpen}
      onOpenChange={handleDropdownToggle}
      css={{ backgroundColor: '$white' }}
    >
      {children}
    </Dropdown>
  );
};
