import React, { useState, useEffect } from "react";
import {
  Wallet,
  Clock,
  AlertCircle,
  Calendar,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "motion/react";
import { StatCard } from "../components/StatCard";
import { AgingChart } from "../components/AgingChart";
import { DSOChart } from "../components/DSOChart";
import { DebtorsTable } from "../components/DebtorsTable";
import {
  mockARSummary,
  mockAgingBuckets,
  mockTopDebtors,
  mockDSOTrend,
} from "../mockData";
import { getKPISummary } from "../servies/jagota-api";
import { agingBucket } from "../servies/jagota-api";
import { AgingBucket, ARData } from "../types";

export const Dashboard = () => {
  const [arSummary, setArSummary] = useState<ARData>(mockARSummary);
  const [agingBucket, setAgingBucket] =
    useState<AgingBucket[]>(mockAgingBuckets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKPISummary();
        console.log("data from api:", data);

        if (data) {
          setArSummary((prev) => ({
            ...prev,
            totalOutstanding:
              data.totalOutstanding ??
              data.TOTAL_OUTSTANDING ??
              prev.totalOutstanding,
            customerCount:
              data.customerCount ?? data.CUST_CNT ?? prev.customerCount,
            notYetDue: data.notYetDue ?? data.NOT_YET_DUE ?? prev.notYetDue,
            dueToday: data.dueToday ?? data.DUE_TODAY ?? prev.dueToday,
            overdue: data.overdue ?? data.OVERDUE ?? prev.overdue,
            dso: data.dso ?? data.DSO_INDEX ?? prev.dso,
            cei: data.cei ?? data.CEI_PERCENT ?? prev.cei,
            badDebtRatio:
              data.badDebtRatio ?? data.BAD_DEBT_RATIO ?? prev.badDebtRatio,
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Dashboard data:", error);
        setLoading(false);
      }
    };

    const fetchAgingBucket = async () => {
      try {
        const data = await agingBucket();
        console.log("data from api:", data);

        if (data) {
          setAgingBucket((prev) => ({
            ...prev,
            range: data.range ?? data.Range ?? prev.range,
            amount: data.amount ?? data.Total_Amount ?? prev.amount,
            count: data.count ?? data.Invoice_Count ?? prev.count,
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
    fetchAgingBucket();
  }, []);

  return (
    <>
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Outstanding"
          value={`${(arSummary.totalOutstanding ?? 0).toLocaleString()}`}
          subtitle={`${(arSummary.customerCount ?? 0).toLocaleString()} Active Customers`}
          icon={Wallet}
          trend={{
            value: 5.0,
            isPositive: false,
          }}
        />
        <StatCard
          title="Not Yet Due"
          value={`${(arSummary.notYetDue ?? 0).toLocaleString()}`}
          subtitle="Future Cash Inflow"
          icon={Clock}
          variant="success"
        />
        <StatCard
          title="Due Today"
          value={`${(arSummary.dueToday ?? 0).toLocaleString()}`}
          subtitle="Immediate Collection Target"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Overdue"
          value={`${(arSummary.overdue ?? 0).toLocaleString()}`}
          subtitle="Requires Action"
          icon={AlertCircle}
          variant="danger"
          trend={{ value: 12.5, isPositive: true }}
        />
      </section>
      {/* Secondary Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              DSO Index
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-3xl font-bold">{`${(arSummary.dso ?? 0).toLocaleString()}`}</h4>
              <span className="text-sm text-slate-400">days</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-emerald-600 text-sm font-semibold">
              <ArrowDownRight size={16} />
              <span>1.2d</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase mt-1">
              vs Last Month
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Collection Eff. (CEI)
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-3xl font-bold">
                {(arSummary.cei ?? 0).toLocaleString()} %
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-emerald-600 text-sm font-semibold">
              <ArrowUpRight size={16} />
              <span>0.5%</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase mt-1">
              vs Last Month
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Bad Debt Ratio
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-3xl font-bold">
                {(arSummary.badDebtRatio ?? 0).toLocaleString()} %
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-red-600 text-sm font-semibold">
              <ArrowUpRight size={16} />
              <span>0.2%</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase mt-1">
              vs Last Month
            </p>
          </div>
        </motion.div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">AR Aging Bucket</h3>
              <p className="text-sm text-slate-500">
                Distribution of overdue debt by age
              </p>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
              <RefreshCcw size={18} />
            </button>
          </div>
          <AgingChart data={mockAgingBuckets} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">DSO Trend</h3>
              <p className="text-sm text-slate-500">
                Average collection period (6 months)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="text-xs font-medium text-slate-500">
                DSO Value
              </span>
            </div>
          </div>
          <DSOChart data={mockDSOTrend} />
        </motion.div>
      </section>
      {/* Table Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Top Debtors</h3>
            <p className="text-sm text-slate-500">
              Customers with highest outstanding balances
            </p>
          </div>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            View All Customers
          </button>
        </div>
        <DebtorsTable debtors={mockTopDebtors} />
      </section>
    </>
  );
};
