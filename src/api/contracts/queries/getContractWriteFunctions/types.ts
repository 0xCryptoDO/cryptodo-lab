import { Network } from "@cryptodo/contracts";

export interface GetContractWriteFunctionsRequest {
  network: Network;
  address: string;
  testnet: boolean;
}

export type GetContractWriteFunctionsResponse = Array<string>;
