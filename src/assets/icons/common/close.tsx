import { FC, SVGProps } from 'react';

export const CloseIcon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    >
      <path d="M15 5L5 15M5 5l10 10" />
    </g>
  </svg>
);
