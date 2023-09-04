export interface CrumbProps {
  title: string;
  href?: string;
  isLast?: boolean;
  onClick?: () => void;
  disabled: boolean;
}
