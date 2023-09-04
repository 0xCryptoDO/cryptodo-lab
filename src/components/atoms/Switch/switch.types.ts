export interface SwitchProps {
    label: string;
    id?: string;
    disabled?: boolean;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }