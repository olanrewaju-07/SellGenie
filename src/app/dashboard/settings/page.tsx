"use client";

import { useState } from "react";
import { User, Bot, Bell, Shield, Save, Store, Mail, Phone, Globe, MessageSquare } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"General" | "AI Assistant" | "Notifications" | "Security">("General");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // Simulate API call
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your store, AI agent, and account preferences</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-70 transition-colors shadow-sm shadow-emerald-500/20"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("General")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "General" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}
            >
              <Store className="h-4 w-4" />
              General Store Info
            </button>
            <button
              onClick={() => setActiveTab("AI Assistant")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "AI Assistant" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}
            >
              <Bot className="h-4 w-4" />
              AI Agent Behavior
            </button>
            <button
              onClick={() => setActiveTab("Notifications")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "Notifications" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("Security")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "Security" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}
            >
              <Shield className="h-4 w-4" />
              Security
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
          {activeTab === "General" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Store Information</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">This information will be displayed to your customers.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Store Name</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" defaultValue="Lagos Fashion Hub" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="email" defaultValue="support@lagosfashion.com" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Support Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="tel" defaultValue="+234 800 000 0000" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Store Description</label>
                  <textarea rows={4} defaultValue="Premium fashion and accessories straight from the heart of Lagos." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white resize-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "AI Assistant" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Agent Behavior</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure how SellGenie interacts with your customers.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Conversational Tone</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex flex-col p-4 border border-emerald-500 bg-emerald-50/50 rounded-xl cursor-pointer dark:bg-emerald-900/10 dark:border-emerald-500">
                      <input type="radio" name="tone" className="sr-only" defaultChecked />
                      <span className="font-semibold text-emerald-800 dark:text-emerald-400">Friendly & Casual</span>
                      <span className="text-xs text-slate-500 mt-1 dark:text-slate-400">Uses emojis, warm greetings, conversational.</span>
                    </label>
                    <label className="flex flex-col p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700">
                      <input type="radio" name="tone" className="sr-only" />
                      <span className="font-semibold text-slate-900 dark:text-slate-200">Professional</span>
                      <span className="text-xs text-slate-500 mt-1 dark:text-slate-400">Direct, polite, strictly business.</span>
                    </label>
                    <label className="flex flex-col p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700">
                      <input type="radio" name="tone" className="sr-only" />
                      <span className="font-semibold text-slate-900 dark:text-slate-200">Enthusiastic</span>
                      <span className="text-xs text-slate-500 mt-1 dark:text-slate-400">High energy, sales-focused, persuasive.</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Escalation Rules</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Escalate immediately if customer says "human" or "agent"</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Escalate on refund requests</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Escalate if a question is repeated 3 times</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose what you want to be notified about.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">New Orders</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Get notified when a customer completes a purchase</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">AI Escalations</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Get notified when a chat needs human intervention</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Low Stock Alerts</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Get notified when a product falls below 5 items</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security Settings</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Keep your account and store secure.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                    <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                    <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
