"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart2, 
  Settings,
  CreditCard,
  LogOut,
  ChevronUp
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare, badge: 12 },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // In a real app, you would clear cookies/auth state here
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0F172A] text-white relative">
      {/* Logo Area */}
      <div className="flex flex-col justify-center px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">SellGenie</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Agent Active
          </span>
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                isActive 
                  ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/50" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-300"}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800 relative" ref={dropdownRef}>
        {/* Logout Dropdown Modal */}
        {showDropdown && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-3">
              <p className="text-xs font-medium text-slate-400 mb-2 px-2">Account Options</p>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors hover:bg-slate-800/80 ${showDropdown ? 'bg-slate-800' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold shrink-0">
              AJ
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Amaka's Store</p>
              <p className="text-xs text-slate-400 truncate">Growth Plan</p>
            </div>
          </div>
          <ChevronUp className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
