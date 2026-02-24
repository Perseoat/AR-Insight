import { 
  Wallet, 
  Download,
  Filter
} from 'lucide-react';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Wallet size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AR Insight</h1>
              <p className="text-xs text-slate-500 font-medium">Accounts Receivable Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
              <Filter size={16} />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 AR Insight Dashboard. All data is updated as of Feb 22, 2026.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
