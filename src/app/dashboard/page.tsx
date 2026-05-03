import { Download, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Saturday, 3 May 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
            <Plus className="h-4 w-4" />
            New Product
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="p-5 bg-white border-l-4 border-emerald-500 rounded-lg shadow-sm border-y border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:border-l-emerald-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Today's Revenue</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">₦142,500</span>
          </div>
          <p className="mt-1 text-sm text-emerald-600 flex items-center gap-1">
            <span className="font-medium">↑ 18%</span> <span className="text-slate-500 dark:text-slate-400">vs yesterday</span>
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-5 bg-white border-l-4 border-teal-500 rounded-lg shadow-sm border-y border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:border-l-teal-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Conversations</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">87</span>
          </div>
          <p className="mt-1 text-sm text-teal-600 flex items-center gap-1">
            <span className="font-medium">↑ 12</span> <span className="text-slate-500 dark:text-slate-400">new today</span>
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-5 bg-white border-l-4 border-amber-500 rounded-lg shadow-sm border-y border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:border-l-amber-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Pending Orders</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">23</span>
          </div>
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span className="font-medium">↓ 5</span> <span className="text-slate-500 dark:text-slate-400">need action</span>
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-5 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm border-y border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:border-l-blue-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">AI Response Rate</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">98.2%</span>
          </div>
          <p className="mt-1 text-sm text-emerald-600 flex items-center gap-1">
            <span className="font-medium">↑</span> <span className="text-slate-500 dark:text-slate-400">excellent</span>
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Revenue This Week (₦)</h3>
          <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center dark:bg-slate-800">
            <span className="text-slate-400 text-sm">Chart Placeholder</span>
          </div>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Traffic by Channel</h3>
          <div className="flex flex-col items-center justify-center h-64 gap-6">
            <div className="relative w-32 h-32 rounded-full border-[16px] border-emerald-500 border-r-teal-400 border-b-slate-200 dark:border-b-slate-700 transform rotate-45"></div>
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-slate-600 dark:text-slate-300">WhatsApp</span></div>
                <span className="font-medium">60%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-teal-400"></span><span className="text-slate-600 dark:text-slate-300">Instagram</span></div>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span><span className="text-slate-600 dark:text-slate-300">Other</span></div>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                <th className="py-3 px-4 font-semibold">Order #</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">SG-2026-0421</td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">Chioma O.</td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">Red Ankara Dress (×2)</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">₦28,000</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    Confirmed
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600 flex items-center gap-2 dark:text-slate-400">
                  <span className="text-green-500">WA</span> WhatsApp
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">SG-2026-0420</td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">Emeka Taiwo</td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">iPhone Case + Guard</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">₦9,500</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Processing
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600 flex items-center gap-2 dark:text-slate-400">
                  <span className="text-pink-500">IG</span> Instagram
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">SG-2026-0419</td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">Fatima Abubakar</td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">Skincare Bundle ×1</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">₦45,000</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Shipped
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600 flex items-center gap-2 dark:text-slate-400">
                  <span className="text-green-500">WA</span> WhatsApp
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
