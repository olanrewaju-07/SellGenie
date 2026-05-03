import { Download } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last 30 days</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border-r border-slate-300 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700">
              7 days
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border-r border-emerald-600">
              30 days
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              90 days
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
            <Download className="h-4 w-4" />
            Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-emerald-500 dark:bg-slate-900 dark:border-slate-800 dark:border-l-emerald-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Total Revenue</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">₦2.4M</span>
          </div>
          <p className="mt-1 text-sm text-emerald-600 flex items-center gap-1">
            <span className="font-medium">↑ 34%</span> <span className="text-slate-500 dark:text-slate-400">vs last month</span>
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-teal-500 dark:bg-slate-900 dark:border-slate-800 dark:border-l-teal-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Conversion Rate</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">42%</span>
          </div>
          <p className="mt-1 text-sm text-emerald-600 flex items-center gap-1">
            <span className="font-medium">↑</span> <span className="text-slate-500 dark:text-slate-400">from 31% last month</span>
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-amber-500 dark:bg-slate-900 dark:border-slate-800 dark:border-l-amber-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Avg. Response Time</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">0.8s</span>
          </div>
          <p className="mt-1 text-sm text-slate-500 flex items-center gap-1 dark:text-slate-400">
            AI-powered 🤖
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:border-l-blue-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">New Customers</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">148</span>
          </div>
          <p className="mt-1 text-sm text-emerald-600 flex items-center gap-1">
            <span className="font-medium">↑ 22%</span> <span className="text-slate-500 dark:text-slate-400">growth</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Chart */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Daily Revenue (₦)</h3>
          <div className="flex-1 bg-slate-100 rounded-lg flex items-center justify-center min-h-[250px] dark:bg-slate-800">
             <span className="text-slate-400 text-sm">Chart Placeholder</span>
          </div>
        </div>

        {/* AI Performance */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">AI Performance</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium dark:text-slate-300">Response Rate</span>
                <span className="text-emerald-600 font-bold">98.2%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 dark:bg-slate-800">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '98.2%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium dark:text-slate-300">Conversion Rate</span>
                <span className="text-teal-500 font-bold">42%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 dark:bg-slate-800">
                <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium dark:text-slate-300">Escalation Rate</span>
                <span className="text-amber-500 font-bold">8%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 dark:bg-slate-800">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium dark:text-slate-300">Customer Satisfaction</span>
                <span className="text-blue-500 font-bold">4.7/5</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 dark:bg-slate-800">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Top Products by Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Orders</th>
                  <th className="py-3 px-4 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">Red Ankara Dress</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">41</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">₦574,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">Skincare Bundle</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">28</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">₦1,260,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Peak Inquiry Hours */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Peak Inquiry Hours</h3>
          <div className="flex-1 bg-slate-100 rounded-lg flex flex-col items-center justify-center min-h-[250px] dark:bg-slate-800 relative">
             <span className="text-slate-400 text-sm">Chart Placeholder</span>
             <div className="absolute bottom-2 w-full px-4 flex justify-between text-xs text-slate-400">
                <span>6am</span>
                <span>12pm</span>
                <span>6pm</span>
                <span>12am</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
