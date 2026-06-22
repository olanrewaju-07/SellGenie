"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap, Store, Phone, AtSign, Bot, CheckCircle2,
  ArrowRight, ArrowLeft, Loader2, ShieldCheck, AlertCircle,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Store Setup", icon: Store },
  { id: 2, label: "WhatsApp", icon: Phone },
  { id: 3, label: "Instagram", icon: AtSign },
  { id: 4, label: "AI Persona", icon: Bot },
];

type FormData = {
  storeName: string;
  storeCategory: string;
  currency: string;
  whatsappNumber: string;
  whatsappCode: string;
  instagramHandle: string;
  aiName: string;
  aiTone: string;
};

const CATEGORIES = [
  "Fashion & Apparel", "Electronics", "Food & Beverages", "Beauty & Cosmetics",
  "Home & Furniture", "Health & Wellness", "Books & Education", "Other",
];

const TONES = [
  { value: "friendly", label: "Friendly & Warm", desc: "Casual, approachable, uses emojis occasionally" },
  { value: "professional", label: "Professional", desc: "Formal, polished, business-focused" },
  { value: "energetic", label: "Energetic & Fun", desc: "Enthusiastic, exciting, great for youth brands" },
  { value: "luxurious", label: "Luxurious & Elegant", desc: "Sophisticated, premium feel" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    storeName: "", storeCategory: "", currency: "NGN",
    whatsappNumber: "", whatsappCode: "",
    instagramHandle: "", aiName: "Genie", aiTone: "friendly",
  });
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [whatsappVerified, setWhatsappVerified] = useState(false);
  const [whatsappError, setWhatsappError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [igStatus, setIgStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [completing, setCompleting] = useState(false);

  const set = (key: keyof FormData, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  // --- WhatsApp: send OTP simulation ---
  const handleSendCode = async () => {
    if (!form.whatsappNumber || form.whatsappNumber.length < 10) {
      setWhatsappError("Please enter a valid phone number.");
      return;
    }
    setWhatsappError("");
    setLoadingVerify(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoadingVerify(false);
    setCodeSent(true);
  };

  // --- WhatsApp: verify OTP simulation ---
  const handleVerifyCode = async () => {
    if (form.whatsappCode.length < 4) { setWhatsappError("Enter the 6-digit code."); return; }
    setWhatsappError("");
    setLoadingVerify(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoadingVerify(false);
    // Treat "123456" as the correct demo code
    if (form.whatsappCode === "123456") {
      setWhatsappVerified(true);
    } else {
      setWhatsappError("Incorrect code. Try 123456 for this demo.");
    }
  };

  // --- Instagram: validate handle simulation ---
  const handleCheckInstagram = async () => {
    if (!form.instagramHandle) return;
    setIgStatus("checking");
    await new Promise(r => setTimeout(r, 1800));
    // Handles starting with "invalid" are rejected in demo
    setIgStatus(form.instagramHandle.toLowerCase().startsWith("invalid") ? "invalid" : "valid");
  };

  // --- Final submit ---
  const handleComplete = async () => {
    setCompleting(true);
    await new Promise(r => setTimeout(r, 2000));
    router.push("/dashboard");
  };

  const canProceedStep1 = form.storeName.trim() && form.storeCategory;
  const canProceedStep2 = whatsappVerified;
  const canProceedStep3 = true; // Instagram is optional
  const canProceedStep4 = form.aiName.trim() && form.aiTone;

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">SellGenie</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    done ? "bg-emerald-500 border-emerald-500" :
                    active ? "border-emerald-500 bg-emerald-500/10" :
                    "border-slate-700 bg-slate-800/50"
                  }`}>
                    {done ? <CheckCircle2 className="h-5 w-5 text-white" /> : <Icon className={`h-4 w-4 ${active ? "text-emerald-400" : "text-slate-500"}`} />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${active ? "text-emerald-400" : done ? "text-slate-300" : "text-slate-600"}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-500 ${step > s.id ? "bg-emerald-500" : "bg-slate-800"}`} />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-center text-slate-400 text-sm">Step {step} of {STEPS.length}</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/60 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* ─── STEP 1: Store Setup ─── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Set up your store</h2>
              <p className="text-slate-400 mt-1 text-sm">Tell us about your business so your AI agent can represent it perfectly.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Store Name <span className="text-emerald-400">*</span></label>
                <input
                  type="text"
                  value={form.storeName}
                  onChange={e => set("storeName", e.target.value)}
                  placeholder="e.g. Amaka's Boutique"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Category <span className="text-emerald-400">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => set("storeCategory", c)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                        form.storeCategory === c
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Currency</label>
                <select
                  value={form.currency}
                  onChange={e => set("currency", e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                >
                  <option value="NGN">NGN — Nigerian Naira (₦)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                  <option value="GBP">GBP — British Pound (£)</option>
                  <option value="GHS">GHS — Ghanaian Cedi (₵)</option>
                  <option value="KES">KES — Kenyan Shilling (KSh)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: WhatsApp ─── */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>
              <p className="text-slate-400 mt-1 text-sm">We'll send a verification code to confirm your WhatsApp Business number.</p>
            </div>
            {whatsappVerified ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500">
                  <ShieldCheck className="h-8 w-8 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold text-white">WhatsApp Verified!</p>
                <p className="text-slate-400 text-sm text-center">
                  <span className="text-emerald-400 font-medium">{form.whatsappNumber}</span> is connected. Your AI agent will reply from this number.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">WhatsApp Business Number <span className="text-emerald-400">*</span></label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={form.whatsappNumber}
                      onChange={e => set("whatsappNumber", e.target.value)}
                      placeholder="+234 801 234 5678"
                      disabled={codeSent}
                      className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition disabled:opacity-50"
                    />
                    {!codeSent && (
                      <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={loadingVerify}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
                      >
                        {loadingVerify ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Code"}
                      </button>
                    )}
                  </div>
                </div>
                {codeSent && (
                  <div className="space-y-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                    <p className="text-sm text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Code sent to {form.whatsappNumber}. Check your WhatsApp.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={form.whatsappCode}
                        onChange={e => set("whatsappCode", e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 tracking-widest transition"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={loadingVerify}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
                      >
                        {loadingVerify ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">Demo hint: use code <span className="text-emerald-400 font-mono">123456</span></p>
                  </div>
                )}
                {whatsappError && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <AlertCircle className="h-4 w-4 shrink-0" /> {whatsappError}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── STEP 3: Instagram ─── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Link Instagram <span className="text-slate-500 text-lg font-normal">(Optional)</span></h2>
              <p className="text-slate-400 mt-1 text-sm">Connect your Instagram Business or Creator account to manage DMs from SellGenie.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Instagram Handle</label>
                <div className="flex gap-2">
                  <div className="flex items-center rounded-l-lg bg-slate-800 border border-r-0 border-slate-700 px-3 text-slate-400 text-sm">@</div>
                  <input
                    type="text"
                    value={form.instagramHandle}
                    onChange={e => { set("instagramHandle", e.target.value); setIgStatus("idle"); }}
                    placeholder="yourbusiness"
                    className="flex-1 rounded-r-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  <button
                    type="button"
                    onClick={handleCheckInstagram}
                    disabled={!form.instagramHandle || igStatus === "checking"}
                    className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-700 px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-40"
                  >
                    {igStatus === "checking" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                  </button>
                </div>
              </div>
              {igStatus === "valid" && (
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                  <ShieldCheck className="h-4 w-4" /> @{form.instagramHandle} is verified and connected!
                </div>
              )}
              {igStatus === "invalid" && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4" /> We couldn't find that account. Make sure it's a Business or Creator account.
                </div>
              )}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-xs text-slate-400 space-y-1">
                <p className="font-medium text-slate-300">Why connect Instagram?</p>
                <p>Your AI agent will handle customer DMs on Instagram automatically — just like WhatsApp. You can skip this now and connect it later in Settings.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 4: AI Persona ─── */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Configure your AI Agent</h2>
              <p className="text-slate-400 mt-1 text-sm">Give your Genie a name and a personality that matches your brand.</p>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Agent Name <span className="text-emerald-400">*</span></label>
                <input
                  type="text"
                  value={form.aiName}
                  onChange={e => set("aiName", e.target.value)}
                  placeholder="e.g. Genie, Ada, Zara"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Customers will be greeted by this name when they message you.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Conversation Tone <span className="text-emerald-400">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TONES.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => set("aiTone", t.value)}
                      className={`text-left rounded-xl border p-3.5 transition-all ${
                        form.aiTone === t.value
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${form.aiTone === t.value ? "text-emerald-400" : "text-white"}`}>{t.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wider">Preview message</p>
                <div className="flex gap-2 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">
                    {form.aiName?.[0]?.toUpperCase() || "G"}
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-sm text-slate-200 max-w-xs">
                    {form.aiTone === "friendly" && `Hi there! 👋 I'm ${form.aiName || "Genie"} from ${form.storeName || "our store"}. How can I help you today?`}
                    {form.aiTone === "professional" && `Good day. I am ${form.aiName || "Genie"}, your dedicated sales assistant at ${form.storeName || "our store"}. How may I assist you?`}
                    {form.aiTone === "energetic" && `Hey hey! 🔥 ${form.aiName || "Genie"} here from ${form.storeName || "our store"}! Ready to find you something AMAZING today?!`}
                    {form.aiTone === "luxurious" && `Welcome. I am ${form.aiName || "Genie"}, your personal stylist at ${form.storeName || "our store"}. I am here to curate the finest experience for you.`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3)
              }
              className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 3 && igStatus !== "valid" ? "Skip for now" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canProceedStep4 || completing}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {completing ? <><Loader2 className="h-4 w-4 animate-spin" /> Setting up your Genie…</> : <><Zap className="h-4 w-4" /> Launch my SellGenie</>}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-600">You can update all of this later in Settings.</p>
      <p className="mt-2 text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
          Log in
        </Link>
      </p>
    </div>
  );
}
