"use client";

import { useState } from "react";
import { Search, User, Zap, Send, CheckCircle2, X } from "lucide-react";

type Message = { id: number; sender: 'customer' | 'ai' | 'human'; text: string; time: string; };
type Chat = {
  id: number;
  customerName: string;
  initials: string;
  phone: string;
  time: string;
  unreadCount: number;
  channel: "WhatsApp" | "Instagram";
  isEscalated: boolean;
  messages: Message[];
  details: {
    orders: number;
    spent: string;
    tag: string;
    intent: string;
    aiTurns: string;
    orderDraft: string;
    orderPreview: { item: string; qty: number; price: string; total: string; } | null;
  };
};

const initialConversations: Chat[] = [
  {
    id: 1,
    customerName: "Chioma Okafor",
    initials: "CO",
    phone: "+234 801 234 5678",
    time: "2m ago",
    unreadCount: 3,
    channel: "WhatsApp",
    isEscalated: false,
    messages: [
      { id: 1, sender: 'customer', text: 'Hi! Do you have the red Ankara dress in size 14?', time: '2:34 PM' },
      { id: 2, sender: 'ai', text: "Hello Chioma! 👋 Yes, we have the Red Floral Ankara Dress in size 14. It's ₦14,000 per piece. Would you like 1 or 2?", time: '2:34 PM' },
      { id: 3, sender: 'customer', text: "I'll take 2 please! What's your account number?", time: '2:35 PM' },
      { id: 4, sender: 'ai', text: "Perfect! That's 2 × ₦14,000 = ₦28,000 total. 🎉 Kindly transfer to: GTBank 0123456789 (Amaka Fashions). Send me your delivery details once done!", time: '2:35 PM' }
    ],
    details: { orders: 4, spent: "₦87,000", tag: "VIP", intent: "Purchase", aiTurns: "4/4", orderDraft: "Pending", orderPreview: { item: "Red Ankara Dress", qty: 2, price: "₦14,000", total: "₦28,000" } }
  },
  {
    id: 2,
    customerName: "Emeka Taiwo",
    initials: "ET",
    phone: "+234 802 345 6789",
    time: "15m ago",
    unreadCount: 0,
    channel: "WhatsApp",
    isEscalated: true,
    messages: [
      { id: 1, sender: 'customer', text: 'Can I pay on delivery?', time: '2:00 PM' },
      { id: 2, sender: 'ai', text: 'We currently accept bank transfers and card payments. Would you like to proceed with one of those?', time: '2:01 PM' },
      { id: 3, sender: 'customer', text: 'No, I only want pay on delivery. Let me speak to a human.', time: '2:02 PM' }
    ],
    details: { orders: 1, spent: "₦9,500", tag: "New", intent: "Inquiry", aiTurns: "2/3", orderDraft: "None", orderPreview: null }
  },
  {
    id: 3,
    customerName: "Fatima Abubakar",
    initials: "FA",
    phone: "@fatima_ab",
    time: "1h ago",
    unreadCount: 0,
    channel: "Instagram",
    isEscalated: false,
    messages: [
      { id: 1, sender: 'customer', text: 'Thanks, the order arrived ✓', time: '1:00 PM' },
      { id: 2, sender: 'ai', text: 'You are very welcome! Enjoy your new Skincare Bundle. 😊', time: '1:01 PM' }
    ],
    details: { orders: 2, spent: "₦45,000", tag: "Repeat", intent: "Feedback", aiTurns: "1/1", orderDraft: "None", orderPreview: null }
  },
  {
    id: 4,
    customerName: "Bello Musa",
    initials: "BM",
    phone: "+234 803 456 7890",
    time: "3h ago",
    unreadCount: 1,
    channel: "WhatsApp",
    isEscalated: false,
    messages: [
      { id: 1, sender: 'customer', text: "What's the price of the bag?", time: '11:00 AM' },
      { id: 2, sender: 'ai', text: "Hello! The Premium Leather Handbag is ₦32,000.", time: '11:01 AM' },
      { id: 3, sender: 'customer', text: "Do you have it in brown?", time: '11:05 AM' }
    ],
    details: { orders: 0, spent: "₦0", tag: "Prospect", intent: "Inquiry", aiTurns: "1/2", orderDraft: "None", orderPreview: null }
  }
];

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Chat[]>(initialConversations);
  const [activeTab, setActiveTab] = useState<"All" | "Escalated" | "AI Handled">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [newMessage, setNewMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const activeChat = conversations.find(c => c.id === activeChatId);

  // Filter logic
  const filteredConversations = conversations.filter(chat => {
    // 1. Search filter
    const matchesSearch = chat.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages[chat.messages.length - 1]?.text.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Tab filter
    let matchesTab = true;
    if (activeTab === "Escalated") {
      matchesTab = chat.isEscalated;
    } else if (activeTab === "AI Handled") {
      matchesTab = !chat.isEscalated;
    }

    return matchesSearch && matchesTab;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'human',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: [...chat.messages, newMsg] };
      }
      return chat;
    }));
    setNewMessage("");
  };

  const confirmOrder = () => {
    setShowConfirmModal(true);
    setTimeout(() => {
      setShowConfirmModal(false);
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 relative">
      {/* Success Modal */}
      {showConfirmModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
          <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Order Confirmed!</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-center">
            The order for {activeChat?.customerName} has been successfully processed.
          </p>
          <button
            onClick={() => setShowConfirmModal(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Conversations</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {conversations.length} open · {conversations.filter(c => c.isEscalated).length} escalated to you
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg dark:bg-slate-800">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "All" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("Escalated")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "Escalated" ? "text-amber-700 bg-amber-100 shadow-sm dark:bg-amber-900/30 dark:text-amber-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            Escalated ({conversations.filter(c => c.isEscalated).length})
          </button>
          <button
            onClick={() => setActiveTab("AI Handled")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "AI Handled" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            AI Handled
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <div className="w-full lg:w-80 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shrink-0 dark:bg-slate-900 dark:border-slate-800">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">No conversations found.</div>
            ) : (
              filteredConversations.map(chat => {
                const isActive = chat.id === activeChatId;
                const lastMessage = chat.messages[chat.messages.length - 1]?.text || "";

                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`p-4 cursor-pointer transition-colors ${isActive ? "bg-emerald-50/50 border-l-4 border-emerald-500 dark:bg-emerald-900/10 dark:border-emerald-500" : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-4 border-transparent"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">{chat.initials}</div>
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">{chat.customerName}</span>
                      </div>
                      <span className="text-xs text-slate-400">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center pl-10">
                      <p className="text-xs text-slate-600 truncate pr-4 dark:text-slate-400">{lastMessage}</p>
                      {chat.unreadCount > 0 && !isActive && (
                        <span className="h-5 w-5 flex shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">{chat.unreadCount}</span>
                      )}
                    </div>
                    <div className="pl-10 mt-2 flex items-center gap-2">
                      {chat.isEscalated ? (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full dark:bg-amber-900/20 dark:text-amber-400">Escalated</span>
                      ) : (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${chat.channel === 'WhatsApp' ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:text-pink-400'}`}>{chat.channel}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Center - Chat Window */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden min-w-[320px] dark:bg-slate-900 dark:border-slate-800">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold dark:bg-emerald-900/30 dark:text-emerald-400">{activeChat.initials}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-slate-900 dark:text-white">{activeChat.customerName}</h2>
                    {!activeChat.isEscalated && <div className="h-2 w-2 rounded-full bg-emerald-500" title="AI Active" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activeChat.phone} · {activeChat.channel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, isEscalated: !c.isEscalated } : c));
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded transition-colors ${activeChat.isEscalated ? "text-slate-700 bg-slate-100 border-slate-300 hover:bg-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" : "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-800/50 dark:text-amber-400"}`}
                >
                  <Zap className="h-3 w-3" />
                  {activeChat.isEscalated ? "Hand Back to AI" : "Take Over"}
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {activeChat.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm relative group ${msg.sender === 'customer'
                    ? 'rounded-tl-sm bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                    : msg.sender === 'human'
                      ? 'rounded-tr-sm bg-teal-600 text-white' // Human is teal
                      : 'rounded-tr-sm bg-emerald-600 text-white' // AI is emerald
                    }`}>
                    <p className={`text-sm ${msg.sender === 'customer' ? 'text-slate-800 dark:text-slate-200' : 'text-white'}`}>{msg.text}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-[10px] ${msg.sender === 'customer' ? 'text-slate-400' : 'text-emerald-100'}`}>
                        {msg.time} {msg.sender !== 'customer' && `· ${msg.sender === 'human' ? 'You' : 'AI'}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={activeChat.isEscalated ? "Type your message..." : "Reply manually (AI is handling this)..."}
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
                <button type="submit" disabled={!newMessage.trim()} className="flex items-center justify-center h-10 w-16 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white border border-slate-200 rounded-xl overflow-hidden min-w-[320px] dark:bg-slate-900 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            Select a conversation to view details
          </div>
        )}

        {/* Right Sidebar - Details */}
        {activeChat && (
          <div className="w-full lg:w-72 flex flex-col gap-4 overflow-y-auto shrink-0">
            {/* Customer Details */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 dark:bg-slate-900 dark:border-slate-800">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3 dark:text-slate-400">Customer</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Name</span>
                  <span className="font-medium text-slate-900 dark:text-white">{activeChat.customerName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Orders</span>
                  <span className="font-medium text-slate-900 dark:text-white">{activeChat.details.orders} total</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Spent</span>
                  <span className="font-medium text-slate-900 dark:text-white">{activeChat.details.spent}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Tag</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded dark:bg-emerald-900/30 dark:text-emerald-400">{activeChat.details.tag}</span>
                </div>
              </div>
            </div>

            {/* Conversation Info */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 dark:bg-slate-900 dark:border-slate-800">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3 dark:text-slate-400">This Conversation</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Intent</span>
                  <span className="font-medium text-slate-900 dark:text-white">{activeChat.details.intent}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">AI Turns</span>
                  <span className="font-medium text-slate-900 dark:text-white">{activeChat.details.aiTurns}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Order Draft</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeChat.details.orderDraft === 'Pending' ? 'text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' : 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400'}`}>{activeChat.details.orderDraft}</span>
                </div>
              </div>
            </div>

            {/* Order Preview */}
            {activeChat.details.orderPreview && (
              <div className="bg-white border border-slate-200 rounded-xl p-4 dark:bg-slate-900 dark:border-slate-800">
                <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3 dark:text-slate-400">Order Preview</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 dark:bg-slate-800 dark:border-slate-700">
                  <p className="font-medium text-sm text-slate-900 mb-1 dark:text-white">{activeChat.details.orderPreview.item}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {activeChat.details.orderPreview.qty} × {activeChat.details.orderPreview.price}</p>
                  <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center dark:border-slate-700">
                    <span className="font-bold text-sm text-emerald-600">Total: {activeChat.details.orderPreview.total}</span>
                  </div>
                </div>
                <button
                  onClick={confirmOrder}
                  className="w-full py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
