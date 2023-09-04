interface Breadcrumb {
  label: string;
  link?: string;
  noTranslation?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export interface BreadcrumbsProps {
  routes: Breadcrumb[];
}
