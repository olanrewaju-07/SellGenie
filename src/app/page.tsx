"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, MessageCircle, MessageSquare, Brain, 
  ShoppingCart, BarChart3, Clock, Users, Check, Menu, X 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20 max-w-7xl">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sell<span className="text-emerald-600">Genie</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-8">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium text-slate-900 dark:text-white hover:text-emerald-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="text-slate-900 dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-600 dark:text-slate-400 py-2"
              >
                {link.label}
              </a>
            ))}
            <Link href="/login" className="text-base font-medium text-slate-900 dark:text-white py-2">
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-lg bg-emerald-600 text-white text-sm font-semibold text-center mt-2"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-slate-50 dark:bg-slate-950">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
              <MessageCircle size={14} className="text-emerald-600" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">AI-Powered Sales Agent for Social Commerce</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-slate-900 dark:text-white">
              Never Miss a Sale on{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">WhatsApp</span>{" "}
              &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">Instagram</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              SellGenie is your autonomous AI sales agent that handles inquiries, processes orders, and closes deals 24/7 — right inside your customers' favourite messaging apps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                See How It Works
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                40M+ Nigerian SMEs
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                24/7 Autonomous
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[80px]" />
              <div className="relative h-full w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60')] bg-cover bg-center" />
                <div className="relative z-10 w-full max-w-xs space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm p-4 shadow-sm ml-auto max-w-[85%] text-sm">
                    Hi! Do you have the Red Floral Dress in size Medium? Also how much is delivery to Lekki?
                  </div>
                  <div className="bg-emerald-600 text-white rounded-2xl rounded-br-sm p-4 shadow-md max-w-[85%] text-sm">
                    Hello! 👋 Yes, we have the Red Floral Dress in Medium. Delivery to Lekki is ₦2,500 and takes 24 hours. Would you like me to process your order now?
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: MessageSquare, title: "Omnichannel Conversations", description: "Seamlessly handle WhatsApp & Instagram DMs in real-time. Text, voice notes, images — all supported." },
    { icon: Brain, title: "Intelligent AI Engine", description: "Goes beyond keywords. Understands intent, handles ambiguity, and generates brand-consistent, natural replies." },
    { icon: ShoppingCart, title: "Automated Order Processing", description: "From product inquiry to payment link to confirmation — fully autonomous end-to-end order management." },
    { icon: BarChart3, title: "Actionable Analytics", description: "Track conversion rates, top products, peak hours, and customer satisfaction from a clean dashboard." },
    { icon: Clock, title: "24/7 Availability", description: "Never miss an inquiry again. SellGenie responds instantly at 2am, on holidays, and during peak rushes." },
    { icon: Users, title: "Customer Intelligence", description: "Build persistent customer profiles with purchase history, preferences, and automated follow-ups." },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">Features</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Everything Your Business Needs to Sell Smarter
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A unified AI system that turns every conversation into a conversion opportunity.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-5 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                <feat.icon size={22} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{feat.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { number: "01", title: "Connect Your Channels", description: "Link your WhatsApp Business and Instagram accounts in minutes. No coding required." },
    { number: "02", title: "Train Your AI Agent", description: "Upload your product catalogue, pricing, and FAQs. SellGenie learns your brand voice instantly." },
    { number: "03", title: "Go Live & Sell 24/7", description: "Your AI agent starts handling inquiries, processing orders, and closing deals autonomously." },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Live in 3 Simple Steps</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">Set up your AI sales agent in under 10 minutes.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-emerald-500/40 to-transparent" />
              )}
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-indigo-600">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: "40M+", label: "Nigerian SMEs" },
    { value: "80%", label: "Sales lost to slow replies" },
    { value: "$75B", label: "E-commerce market by 2030" },
    { value: "24/7", label: "Always-on AI agent" },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-emerald-900 text-white">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=60')] bg-cover bg-center" />
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-sm text-emerald-100/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const plans = [
    { name: "Starter", price: "₦15,000", period: "/month", description: "Perfect for small businesses getting started with AI sales.", features: ["1 channel (WhatsApp)", "500 conversations/month", "Basic FAQ automation", "Order tracking", "Email support"], highlighted: false },
    { name: "Growth", price: "₦35,000", period: "/month", description: "For growing businesses ready to scale across channels.", features: ["2 channels (WhatsApp + Instagram)", "2,000 conversations/month", "Full order processing", "Customer history & profiles", "Analytics dashboard", "Priority support"], highlighted: true },
    { name: "Enterprise", price: "₦80,000", period: "/month", description: "Unlimited power for high-volume commerce operations.", features: ["Unlimited channels & conversations", "Human escalation routing", "Custom AI training", "Full API access", "Dedicated account manager", "SLA guarantee"], highlighted: false },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 relative bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">Pricing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Plans That Grow With You</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">Start small, scale fast. No hidden fees, cancel anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.highlighted ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-lg scale-[1.02]" : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-emerald-500/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block w-full py-3 rounded-xl text-center font-semibold text-sm transition-all ${
                  plan.highlighted ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
            Ready to Transform Your Social Commerce?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of Nigerian businesses already using SellGenie to sell smarter, respond faster, and grow bigger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Start Your Free Trial
              <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:hello@sellgenie.io"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sell<span className="text-emerald-600">Genie</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
              AI-powered sales & support agent for Nigerian social commerce businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">Features</a></li>
              <li><a href="#pricing" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">Pricing</a></li>
              <li><a href="#how-it-works" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="mailto:hello@sellgenie.io" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">Contact</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Connect</h4>
            <ul className="space-y-2.5">
              <li><a href="mailto:hello@sellgenie.io" className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">hello@sellgenie.io</a></li>
              <li><span className="text-sm text-slate-500 dark:text-slate-400">www.sellgenie.io</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} SellGenie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
