export interface ARData {
  totalOutstanding: number;
  customerCount: number;
  notYetDue: number;
  dueToday: number;
  overdue: number;
  dso: number;
  cei: number;
  badDebtRatio: number;
}

export interface AgingBucket {
  range: string;
  amount: number;
  count: number;
}

export interface Debtor {
  id: string;
  name: string;
  amount: number;
  daysOverdue: number;
  status: 'good' | 'warning' | 'critical';
}

export interface DSOTrend {
  month: string;
  value: number;
}

export interface CashFlowForecast {
  week: string;
  amount: number;
}

export interface AgingTrend {
  month: string;
  amount: number;
  isForecast: boolean;
}
