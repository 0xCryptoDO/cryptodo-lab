import { ContractType } from "@cryptodo/contracts";

export interface UpdateAbiRequest {
  contractId: string;
  contractType: ContractType;
  abi: string;
}

