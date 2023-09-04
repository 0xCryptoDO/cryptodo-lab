import { ReactNode } from 'react';

import { StatisticsResponse } from '@/api/billing/queries/getRef/types';

export interface ReferralCardProps {
  link: string;
  statistics: StatisticsResponse;
  statsItems?: {
    title: string;
    icon?: ReactNode;
    earned?: number;
  }[];
  description?: string;
  size?: 'small' | 'default';
  hideReferralsCount?: boolean;
}
