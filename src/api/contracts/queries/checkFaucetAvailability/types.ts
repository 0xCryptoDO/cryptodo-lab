import { Network } from "@cryptodo/contracts";

export interface Request {
  network: Network;
  address: string;
}
export interface Response {
  isAvailable: boolean;
  nextAvailableDate: Date;
}
