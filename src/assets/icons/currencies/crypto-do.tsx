import { FC } from 'react';
import { Size } from './types';

export const CryptoDoLogoIcon: FC<{size?: Size}> = ({ size = 'md' }) => {
  const sizes: Record<Size, string> = {sm: "18px", md:"25px", lg: "150px"}
  return (
    <svg
      width={sizes[size]}
      height={sizes[size]}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12.9583L11.8706 20.2111L13.5926 19.2168L13.9893 18.8306L3.01453 11.7952L1 12.9583Z"
        fill="url(#paint0_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.04366 7.7193L1.03074 10.5164L1.01437 13.0019L14.0854 5.68272L14.0851 5.57876L12.0563 4.37562L6.04366 7.7193Z"
        fill="url(#paint1_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9888 18.8306L14.9347 17.2621L4.82643 10.8035L3.01123 11.8567L13.9888 18.8306Z"
        fill="url(#paint2_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0831 5.56824L1.00011 12.9644L2.97063 14.2273L14.0831 7.9271L14.0831 5.56824Z"
        fill="url(#paint3_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0412 19.0036L12.2357 20.4886L23.0127 12.9151L21.0231 11.7664L10.0412 19.0036Z"
        fill="url(#paint4_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0001 7.71011L22.977 10.4871L22.9932 12.9548L10.0153 5.68775L10.0157 5.58531L12.0305 4.39039L18.0001 7.71011Z"
        fill="url(#paint5_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0628 5.59957L23.0084 12.918L21.052 14.1719L10.0628 7.9416L10.0628 5.59957Z"
        fill="url(#paint6_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9724 5.4603L13.9978 16.3589L12.0775 17.6104L12.0466 4.34954L12.0469 4.34936L13.9724 5.4603Z"
        fill="url(#paint7_linear_379_6042)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0816 18.9746L12.0834 17.67L12.0524 4.37633L10.0502 5.50323L10.0816 18.9746Z"
        fill="url(#paint8_linear_379_6042)"
      />
      <path
        d="M10.0747 18.9873L10.0747 16.3592L17.202 11.9512L19.137 13.034L10.0747 18.9873Z"
        fill="url(#paint9_linear_379_6042)"
      />
      <path
        d="M3.74902 6.47216L12.0314 1.75757L20.6961 6.727"
        stroke="url(#paint10_linear_379_6042)"
        strokeWidth="0.4"
      />
      <path
        d="M20.6963 17.5577L12.4139 22.2723L3.74924 17.3029"
        stroke="url(#paint11_linear_379_6042)"
        strokeWidth="0.4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_379_6042"
          x1="11.6328"
          y1="19.2483"
          x2="4.04065"
          y2="13.8604"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#02064A" />
          <stop offset="1" stopColor="#0134B9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_379_6042"
          x1="1.95928"
          y1="11.0444"
          x2="11.084"
          y2="6.26638"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0285E3" />
          <stop offset="1" stopColor="#01C3FD" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_379_6042"
          x1="11.2653"
          y1="16.5544"
          x2="5.26511"
          y2="12.0236"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4077E2" />
          <stop offset="1" stopColor="#185DEE" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_379_6042"
          x1="2.69433"
          y1="13.3704"
          x2="10.8246"
          y2="9.68135"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0136BD" />
          <stop offset="1" stopColor="#02064A" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_379_6042"
          x1="20.3732"
          y1="13.6261"
          x2="5.82376"
          y2="21.6222"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#012897" />
          <stop offset="1" stopColor="#004DF4" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_379_6042"
          x1="22.1634"
          y1="11.2889"
          x2="13.408"
          y2="6.62845"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#01C3FD" />
          <stop offset="1" stopColor="#0285E3" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_379_6042"
          x1="13.9597"
          y1="6.51351"
          x2="13.4215"
          y2="21.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#02064A" />
          <stop offset="1" stopColor="#004DF4" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_379_6042"
          x1="13.2249"
          y1="6.39089"
          x2="13.3475"
          y2="16.4317"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0285E3" />
          <stop offset="0.494792" stopColor="#0194FE" />
          <stop offset="1" stopColor="#01C3FD" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_379_6042"
          x1="11.7557"
          y1="5.04379"
          x2="11.7557"
          y2="15.0848"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#233B8D" />
          <stop offset="1" stopColor="#1A5FED" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_379_6042"
          x1="6.24544"
          y1="20.8402"
          x2="22.4091"
          y2="9.57462"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#004DF4" />
          <stop offset="1" stopColor="#5786DB" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_379_6042"
          x1="12.2225"
          y1="1.75757"
          x2="12.2225"
          y2="6.727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1E61EB" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_379_6042"
          x1="12.2228"
          y1="22.2723"
          x2="12.2228"
          y2="17.3029"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1E61EB" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
};
