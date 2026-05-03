"use client";

import { useState } from "react";
import { Search, Download, Filter, MoreHorizontal, User, Mail, Phone, ShoppingBag, Star } from "lucide-react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "VIP" | "Returning" | "New";
};

const initialCustomers: Customer[] = [
  { id: "CUS-001", name: "Chioma Okafor", email: "chioma.o@example.com", phone: "+234 801 234 5678", totalOrders: 14, totalSpent: 245000, lastOrder: "Today", status: "VIP" },
  { id: "CUS-002", name: "Emeka Taiwo", email: "emeka.t@example.com", phone: "+234 802 345 6789", totalOrders: 2, totalSpent: 19000, lastOrder: "Today", status: "Returning" },
  { id: "CUS-003", name: "Fatima Abubakar", email: "fatima.a@example.com", phone: "+234 803 456 7890", totalOrders: 1, totalSpent: 45000, lastOrder: "Yesterday", status: "New" },
  { id: "CUS-004", name: "Bello Musa", email: "bello.m@example.com", phone: "+234 804 567 8901", totalOrders: 5, totalSpent: 112000, lastOrder: "2 days ago", status: "Returning" },
  { id: "CUS-005", name: "Adesuwa Igbinoba", email: "adesuwa.i@example.com", phone: "+234 805 678 9012", totalOrders: 8, totalSpent: 156000, lastOrder: "1 week ago", status: "VIP" },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "VIP" | "Returning" | "New">("All");

  const filteredCustomers = initialCustomers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
    const matchesFilter = filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'VIP': return 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 dark:border-fuchsia-800/50';
      case 'Returning': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50';
      case 'New': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your {initialCustomers.length} total customers</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center dark:bg-emerald-900/30 dark:text-emerald-500">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Customers</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1,248</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center dark:bg-fuchsia-900/30 dark:text-fuchsia-500">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">VIP Customers</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">156</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-500">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Orders/Customer</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3.4</h3>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700 w-full sm:w-auto">
          {(["All", "VIP", "Returning", "New"] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filterStatus === status ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                <th className="py-4 px-5 font-semibold">Customer</th>
                <th className="py-4 px-5 font-semibold">Contact</th>
                <th className="py-4 px-5 font-semibold">Orders</th>
                <th className="py-4 px-5 font-semibold">Total Spent</th>
                <th className="py-4 px-5 font-semibold">Last Order</th>
                <th className="py-4 px-5 font-semibold">Status</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs dark:bg-emerald-900/30 dark:text-emerald-500">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-600 flex items-center gap-1 dark:text-slate-400"><Mail className="h-3 w-3" /> {customer.email}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 dark:text-slate-500"><Phone className="h-3 w-3" /> {customer.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {customer.totalOrders}
                    </td>
                    <td className="py-4 px-5 text-sm font-bold text-emerald-600 dark:text-emerald-500">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-500 dark:text-slate-400">
                      {customer.lastOrder}
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
