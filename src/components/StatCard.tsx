import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'danger' | 'warning' | 'success';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-white border-slate-200 text-slate-900',
    danger: 'bg-red-50 border-red-100 text-red-900',
    warning: 'bg-amber-50 border-amber-100 text-amber-900',
    success: 'bg-emerald-50 border-emerald-100 text-emerald-900',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-6 rounded-2xl border shadow-sm flex flex-col gap-2',
        variantClasses[variant]
      )}
    >
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-white/50 border border-current/10">
          <Icon size={20} className="opacity-80" />
        </div>
        {trend && (
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded-full',
            trend.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          )}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium opacity-60 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {subtitle && <p className="text-xs opacity-50 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};
