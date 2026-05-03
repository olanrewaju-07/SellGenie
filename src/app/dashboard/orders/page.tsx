"use client";

import { useState } from "react";
import { Download, ChevronDown, X, Package, Truck, CheckCircle2, User, MapPin, Phone } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: string;
  amount: string;
  paymentStatus: "Pending" | "Paid";
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
  channel: "WA" | "IG";
  date: string;
  time?: string;
};

const initialOrders: Order[] = [
  { id: "SG-2026-0421", customer: "Chioma Okafor", phone: "+234 801 234 5678", address: "12 Admiralty Way, Lekki Phase 1, Lagos", items: "Red Ankara Dress ×2", amount: "₦28,000", paymentStatus: "Pending", status: "Confirmed", channel: "WA", date: "Today", time: "2:36 PM" },
  { id: "SG-2026-0420", customer: "Emeka Taiwo", phone: "+234 802 345 6789", address: "45 Bode Thomas St, Surulere, Lagos", items: "iPhone Case + Guard", amount: "₦9,500", paymentStatus: "Paid", status: "Processing", channel: "IG", date: "Today", time: "1:20 PM" },
  { id: "SG-2026-0419", customer: "Fatima Abubakar", phone: "+234 803 456 7890", address: "8 Gana Street, Maitama, Abuja", items: "Skincare Bundle ×1", amount: "₦45,000", paymentStatus: "Paid", status: "Shipped", channel: "WA", date: "Yesterday" },
  { id: "SG-2026-0418", customer: "Bello Musa", phone: "+234 804 567 8901", address: "23 Independence Way, Kaduna", items: "Leather Bag ×1", amount: "₦32,000", paymentStatus: "Paid", status: "Delivered", channel: "WA", date: "2 days ago" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"All Status" | "Confirmed" | "Processing" | "Shipped" | "Delivered">("All Status");
  const [showTableFilter, setShowTableFilter] = useState(false);

  const filteredOrders = filterStatus === "All Status" ? orders : orders.filter(o => o.status === filterStatus);

  const handleUpdateStatus = (newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === selectedOrder?.id ? { ...o, status: newStatus } : o));
    setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    setShowStatusMenu(false);
  };

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer", "Phone", "Items", "Amount", "Payment", "Status", "Date"];
    const csvRows = filteredOrders.map(o =>
      [o.id, `"${o.customer}"`, `"${o.phone}"`, `"${o.items}"`, `"${o.amount}"`, o.paymentStatus, o.status, `"${o.date} ${o.time || ''}"`].join(",")
    );
    const csvString = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `sellgenie_orders_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800/50';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800/50';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/50';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const getPaymentColor = (status: string) => {
    return status === 'Paid'
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
  };

  return (
    <div className="space-y-6 relative">
      {/* Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Order {selectedOrder.id}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Placed {selectedOrder.date} {selectedOrder.time && `at ${selectedOrder.time}`}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Status Section */}
              <div className="flex gap-3">
                <div className={`px-3 py-1.5 rounded-lg border text-sm font-semibold flex items-center gap-2 transition-colors ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status === 'Delivered' ? <CheckCircle2 className="h-4 w-4" /> : selectedOrder.status === 'Shipped' ? <Truck className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                  {selectedOrder.status}
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${getPaymentColor(selectedOrder.paymentStatus)}`}>
                  Payment: {selectedOrder.paymentStatus}
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-600 dark:text-emerald-500" /> Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Name</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{selectedOrder.phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Shipping Address</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Order Items</h3>
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{selectedOrder.items}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Amount</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setShowStatusMenu(false);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Close
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-500/20"
                >
                  Update Status
                </button>
                {showStatusMenu && (
                  <div className="absolute bottom-full mb-2 right-0 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {(["Confirmed", "Processing", "Shipped", "Delivered"] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(status)}
                        disabled={selectedOrder.status === status}
                        className={`w-full text-left px-4 py-2 text-sm ${selectedOrder.status === status ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                      >
                        Mark as {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Orders</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">128 total this month</p>
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <div className="relative">
            <button
              onClick={() => setShowTableFilter(!showTableFilter)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {filterStatus}
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            {showTableFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden py-1 z-10 animate-in fade-in zoom-in-95 duration-100">
                {(["All Status", "Confirmed", "Processing", "Shipped", "Delivered"] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setShowTableFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${filterStatus === status ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">All</p>
          <span className="text-2xl font-bold text-slate-900 mt-1 block dark:text-white">128</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm border-t-4 border-t-amber-500 dark:bg-slate-900 dark:border-slate-800 dark:border-t-amber-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Pending</p>
          <span className="text-2xl font-bold text-slate-900 mt-1 block dark:text-white">23</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm border-t-4 border-t-teal-500 dark:bg-slate-900 dark:border-slate-800 dark:border-t-teal-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Confirmed</p>
          <span className="text-2xl font-bold text-slate-900 mt-1 block dark:text-white">41</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm border-t-4 border-t-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:border-t-blue-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Shipped</p>
          <span className="text-2xl font-bold text-slate-900 mt-1 block dark:text-white">37</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm border-t-4 border-t-emerald-500 dark:bg-slate-900 dark:border-slate-800 dark:border-t-emerald-500">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">Delivered</p>
          <span className="text-2xl font-bold text-slate-900 mt-1 block dark:text-white">27</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                <th className="py-4 px-5 font-semibold">Order #</th>
                <th className="py-4 px-5 font-semibold">Customer</th>
                <th className="py-4 px-5 font-semibold">Items</th>
                <th className="py-4 px-5 font-semibold">Amount</th>
                <th className="py-4 px-5 font-semibold">Payment</th>
                <th className="py-4 px-5 font-semibold">Status</th>
                <th className="py-4 px-5 font-semibold">Channel</th>
                <th className="py-4 px-5 font-semibold">Date</th>
                <th className="py-4 px-5 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No orders found matching this status.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-5 text-sm font-medium text-slate-900 dark:text-slate-200">{order.id}</td>
                    <td className="py-4 px-5 text-sm text-slate-600 dark:text-slate-400">{order.customer}</td>
                    <td className="py-4 px-5 text-sm text-slate-600 dark:text-slate-400">{order.items}</td>
                    <td className="py-4 px-5 text-sm font-medium text-slate-900 dark:text-slate-200">{order.amount}</td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getPaymentColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-600 flex items-center gap-2 dark:text-slate-400 mt-2">
                      <span className={`${order.channel === 'WA' ? 'text-green-500' : 'text-pink-500'} font-bold`}>{order.channel}</span>
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col"><span>{order.date}</span>{order.time && <span className="text-xs">{order.time}</span>}</div>
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
