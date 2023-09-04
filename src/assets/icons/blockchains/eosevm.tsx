import { FC } from 'react';
import { useTheme } from 'next-themes';
import { EosEvmBlackLogoIcon } from './eosevmBlack';
import { EosEvmWhiteLogoIcon } from './eosevmWhite';

export const EosEvmLogoIcon: FC = () => {

    const { theme } = useTheme();
        if (theme === 'light') {
            return <EosEvmBlackLogoIcon />
        } 
            return <EosEvmWhiteLogoIcon />
        
};