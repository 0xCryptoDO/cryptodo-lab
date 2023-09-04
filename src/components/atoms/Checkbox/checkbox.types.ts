export interface CheckboxProps {
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange: (checked: string | boolean, name: string) => void;
  name: string;
}
