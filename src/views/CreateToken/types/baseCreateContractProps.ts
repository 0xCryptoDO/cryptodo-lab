export interface BaseCreateContractProps {
  nameContract: string;
  allFieldsDisabled: boolean;
  handleOpenModal: (isTestnet: boolean) => void;
  deployConfirmationOpen: boolean;
  toggleDeployConfirmationDialog: (value: boolean) => void;
  confirm: (form: any, isTestnet: boolean) => void;
  isTestnet: boolean;
}
