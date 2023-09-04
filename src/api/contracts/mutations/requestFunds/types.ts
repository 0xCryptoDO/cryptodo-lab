import { Network } from "@cryptodo/contracts";

export interface RequestFundsRequest {
  network: Network;
  address: string;
}
export interface RequestFundsResponse {
  isFaucetAvailable: boolean;
  txHash: string;
  txInExplorerUrl: string;
}
