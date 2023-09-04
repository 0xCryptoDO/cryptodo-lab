import { useTheme } from 'next-themes';
import { FC } from 'react';

export const CronosLogoIcon: FC = () => {
    const { theme } = useTheme();
    if (theme === 'light') {
        return (
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5067 0L0 10.0033V30.0034L17.5067 40L35 30.0034V10.0033L17.5067 0ZM29.817 27.0399L17.5067 34.073L5.1897 27.0399V12.9601L17.5067 5.9269L29.817 12.9601V27.0399Z" fill="#002D74" />
                <path d="M17.5066 40L34.9998 30.0034V10.0033L17.5066 0V5.93362L29.8168 12.9668V27.0466L17.5066 34.073V40Z" fill="url(#paint0_linear_234_13)" />
                <path d="M17.4932 0L0 9.99664V29.9968L17.4932 40V34.0664L5.18291 27.0332V12.9534L17.4932 5.9269V0Z" fill="url(#paint1_linear_234_13)" />
                <path d="M25.6707 24.6731L17.5 29.3397L9.32251 24.6731V15.3336L17.5 10.6604L25.6707 15.3336L22.2696 17.2779L17.5 14.5491L12.7304 17.2779V22.7221L17.5 25.4509L22.2696 22.7221L25.6707 24.6731Z" fill="#002D74" />
                <defs>
                    <linearGradient id="paint0_linear_234_13" x1="26.2532" y1="40" x2="26.2532" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#002D74" />
                        <stop offset="1" stopColor="#002D74" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_234_13" x1="8.74659" y1="0" x2="8.74659" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#002D74" />
                        <stop offset="1" stopColor="#002D74" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
    return (<svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_235_39" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="40">
            <path d="M35 0H0V40H35V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_235_39)">
            <path d="M17.3923 0L0 10.0034V30.0033L17.3923 40L34.7712 30.0033V10.0034L17.3923 0ZM29.6221 27.0399L17.3923 34.0731L5.15577 27.0399V12.9601L17.3923 5.92692L29.6221 12.9601V27.0399Z" fill="white" />
            <path d="M25.5028 24.6731L17.3855 29.3396L9.26147 24.6731V15.3335L17.3855 10.6604L25.5028 15.3335L22.124 17.2779L17.3855 14.5491L12.6471 17.2779V22.7221L17.3855 25.4509L22.124 22.7221L25.5028 24.6731Z" fill="white" />
        </g>
    </svg>
    );
}