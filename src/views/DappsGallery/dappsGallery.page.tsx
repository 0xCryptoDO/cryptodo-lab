import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Space } from '@/components';
import { CryptoDoLogoIcon } from '@/assets/icons';

export const DappsGalleryPage: FC = () => {
    const { t } = useTranslation('common');
    
    return (
        <Space size="large" direction="vertical" align="center">
            <CryptoDoLogoIcon size='lg' />
            <div>{t('dappsGallerySoon')}</div>
        </Space>
    );
};
