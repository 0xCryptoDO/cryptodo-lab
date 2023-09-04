
export interface StatisticsResponse {
  referralsCount: number;
  earned: {
    bnb: string;
    cdo: string;
    busd: string;
  };
}

export interface LinkResponse {
  referralLink: string;
}

export interface WalletResponse {
  referralUserWallet: string;
}
