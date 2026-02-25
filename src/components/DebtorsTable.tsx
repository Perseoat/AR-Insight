import React from "react";
import { FileText, MoreVertical } from "lucide-react";
import { Debtor } from "../types";
import { cn } from "../lib/utils";

interface DebtorsTableProps {
  debtors: Debtor[];
}

export const DebtorsTable: React.FC<DebtorsTableProps> = ({ debtors }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Outstanding
            </th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Days Overdue
            </th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {debtors.map((debtor) => (
            <tr
              key={debtor.id}
              className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
            >
              <td className="py-4 px-4">
                <div className="font-medium text-slate-900">{debtor.name}</div>
                <div className="text-xs text-slate-400">
                  {debtor.id.padStart(4, "0")}
                </div>
              </td>
              <td className="py-4 px-4 font-mono text-sm">
                {debtor.amount.toLocaleString()}
              </td>
              <td className="py-4 px-4">
                <span
                  className={cn(
                    "text-sm font-medium",
                    debtor.daysOverdue > 60
                      ? "text-red-600"
                      : debtor.daysOverdue > 30
                        ? "text-amber-600"
                        : "text-slate-600",
                  )}
                >
                  {debtor.daysOverdue.toLocaleString()} days
                </span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    debtor.status === "critical"
                      ? "bg-red-100 text-red-800"
                      : debtor.status === "warning"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800",
                  )}
                >
                  {debtor.status.charAt(0).toUpperCase() +
                    debtor.status.slice(1)}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="Print Collection Letter"
                  >
                    <FileText size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
