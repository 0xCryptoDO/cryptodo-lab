import { FC } from 'react';
import { useTheme } from 'next-themes';
import { MantleBlackLogoIcon } from './mantleBlack';
import { MantleWhiteLogoIcon } from './mantleWhite';

export const MantleLogoIcon: FC = () => {

    const { theme } = useTheme();
        if (theme === 'light') {
            return <MantleBlackLogoIcon />
        } 
            return <MantleWhiteLogoIcon />
        
};