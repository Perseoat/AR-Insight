import { ARData, AgingBucket, Debtor, DSOTrend, CashFlowForecast } from './types';

export const mockARSummary: ARData = {
  totalOutstanding: 1250000,
  customerCount: 42,
  notYetDue: 750000,
  dueToday: 45000,
  overdue: 455000,
  dso: 34.5,
  cei: 88.2,
  badDebtRatio: 1.6,
};

export const mockAgingBuckets: AgingBucket[] = [
  { range: '1-30 Days', amount: 250000, count: 12 },
  { range: '31-60 Days', amount: 120000, count: 8 },
  { range: '61-90 Days', amount: 65000, count: 5 },
  { range: '> 90 Days', amount: 20000, count: 2 },
];

export const mockTopDebtors: Debtor[] = [
  { id: '1', name: 'Global Tech Solutions', amount: 150000, daysOverdue: 45, status: 'warning' },
  { id: '2', name: 'Acme Corp', amount: 95000, daysOverdue: 92, status: 'critical' },
  { id: '3', name: 'Starlight Industries', amount: 82000, daysOverdue: 12, status: 'good' },
  { id: '4', name: 'Nexus Systems', amount: 74000, daysOverdue: 65, status: 'warning' },
  { id: '5', name: 'Horizon Logistics', amount: 68000, daysOverdue: 5, status: 'good' },
];

export const mockDSOTrend: DSOTrend[] = [
  { month: 'Sep', value: 38 },
  { month: 'Oct', value: 36 },
  { month: 'Nov', value: 37 },
  { month: 'Dec', value: 35 },
  { month: 'Jan', value: 34 },
  { month: 'Feb', value: 34.5 },
];

export const mockCashFlowForecast: CashFlowForecast[] = [
  { week: 'Week 1', amount: 120000 },
  { week: 'Week 2', amount: 180000 },
  { week: 'Week 3', amount: 95000 },
  { week: 'Week 4', amount: 210000 },
];
