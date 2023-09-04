export interface Request {
  wallet: string;
  signature: string;
  referralUserId?: string
}
export interface Response {
  accessToken: string;
}
