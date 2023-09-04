export interface GetCurrentUserResponse {
  regDate: Date;
  _id: string;
  referralUserId?: string;
  referralWallet?: string;
  wallet: string;
}
