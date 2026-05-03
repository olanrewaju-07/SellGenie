"use client";

import { useState } from "react";
import { Check, CreditCard, ShieldCheck, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "15,000",
    period: "month",
    description: "Perfect for small businesses getting started with AI sales.",
    features: [
      "1 channel (WhatsApp)",
      "500 conversations/month",
      "Basic FAQ automation",
      "Order tracking",
      "Email support",
    ],
    highlighted: false,
    planCode: "PLN_starter_15k"
  },
  {
    name: "Growth",
    price: "35,000",
    period: "month",
    description: "For growing businesses ready to scale across channels.",
    features: [
      "2 channels (WhatsApp + Instagram)",
      "2,000 conversations/month",
      "Full order processing",
      "Customer history & profiles",
      "Analytics dashboard",
      "Priority support",
    ],
    highlighted: true,
    planCode: "PLN_growth_35k"
  },
  {
    name: "Enterprise",
    price: "80,000",
    period: "month",
    description: "Unlimited power for high-volume commerce operations.",
    features: [
      "Unlimited channels & conversations",
      "Human escalation routing",
      "Custom AI training",
      "Full API access",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    highlighted: false,
    planCode: "PLN_enterprise_80k"
  },
];

export default function SubscriptionPage() {
  const [currentPlan] = useState("Starter");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setIsProcessing(planName);
    
    // Simulate Paystack initialization
    setTimeout(() => {
      alert(`Paystack Checkout initialized for ${planName} Plan!\n\nIn a real app, this would open the Paystack payment modal using React-Paystack.`);
      setIsProcessing(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subscription & Billing</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your SellGenie plan and payment methods.</p>
        </div>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center dark:bg-emerald-900/30 dark:text-emerald-500 shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Current Plan</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Starter Plan
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50">
                  Active
                </span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Your next billing date is <strong>June 3, 2026</strong>. Auto-renew is enabled.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
              Cancel Subscription
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors">
              <CreditCard className="h-4 w-4" />
              Update Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="mt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upgrade Your Store's Potential</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need more conversations or additional channels? Upgrade to a higher tier and only pay the prorated difference today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.name === currentPlan;
            const isProcessingThis = isProcessing === plan.name;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-white border-emerald-500 shadow-lg dark:bg-slate-900 dark:border-emerald-500 md:-translate-y-2"
                    : "bg-slate-50 border-slate-200 hover:border-emerald-500/30 dark:bg-slate-900/50 dark:border-slate-800"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-sm">
                    Recommended
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline text-slate-900 dark:text-white">
                    <span className="text-lg font-semibold mr-1">₦</span>
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-1">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isCurrent || isProcessing !== null}
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
                    isCurrent
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
                      : plan.highlighted
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:opacity-70"
                      : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
                  }`}
                >
                  {isProcessingThis ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Processing...
                    </>
                  ) : isCurrent ? (
                    "Current Plan"
                  ) : (
                    "Upgrade Plan"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <span>Payments are securely processed by <strong>Paystack</strong>. Cancel anytime.</span>
        </div>
      </div>
    </div>
  );
}
