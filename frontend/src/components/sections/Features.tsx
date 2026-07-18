import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import TiltCard from "../ui/TiltCard";

const features = [
  {
    id: "focus",
    title: "Minimize distraction",
    tagline: "COMMAND CENTER",
    description: "Keep your workspace clean with automated inbox grouping, high-priority filters, and custom visual workspaces designed to reduce friction.",
    details: [
      "Inbox zero workflow integrations",
      "Dynamic notification grouping",
      "Custom workspace presets"
    ],
    preview: (
      <div className="w-full h-full flex flex-col p-6 space-y-4 bg-[#0a0a0c]">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-300">My Workspace</span>
          </div>
          <span className="text-[9px] text-zinc-400 font-mono bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">SYSTEM ACTIVE</span>
        </div>
        <div className="space-y-3">
          <div className="bg-[#121214] border border-white/[0.04] p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-zinc-200 font-medium tracking-wide">Frontend UI Revamp</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono bg-white/[0.03] px-2 py-1 rounded">IN PROGRESS</span>
          </div>
          <div className="bg-[#121214] border border-white/[0.04] p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm text-zinc-200 font-medium tracking-wide">API Gateway Migration</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono bg-white/[0.03] px-2 py-1 rounded">REVIEW</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "track",
    title: "Track issue lifecycles",
    tagline: "DYNAMIC ISSUES",
    description: "Follow issues from creation to deployment. Map dependencies, trace commits, and track velocity metrics automatically.",
    details: [
      "Automated roadmap mapping",
      "Branch and PR correlation",
      "Cycle-time metrics dashboard"
    ],
    preview: (
      <div className="w-full h-full flex flex-col p-6 space-y-4 bg-[#0a0a0c]">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <span className="text-xs font-semibold text-zinc-300">Active Issues Lifecycle</span>
          <span className="text-[10px] text-zinc-500 font-mono">STABLE</span>
        </div>
        <div className="h-44 flex items-end justify-between gap-3 pb-2 border-b border-white/[0.04]">
          {[40, 70, 55, 90, 60, 110, 85].map((h, i) => (
            <div key={i} className="flex-1 bg-white/[0.03] rounded-t-sm relative flex flex-col justify-end h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-300 to-zinc-500 opacity-60 rounded-t-sm" style={{ height: i === 5 ? '4px' : '0px' }} />
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`w-full rounded-t-sm ${i === 5 ? 'bg-gradient-to-t from-zinc-500 to-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'bg-white/10'}`} 
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "analyze",
    title: "Predict blocker patterns",
    tagline: "AI PREDICTIVE INSIGHTS",
    description: "Detect risk, backlog creep, and velocity drops using local LLMs configured directly for your workflow history.",
    details: [
      "Automatic blocker flags",
      "Velocity trend modeling",
      "AI-drafted sprint recaps"
    ],
    preview: (
      <div className="w-full h-full flex flex-col p-6 space-y-5 bg-[#0a0a0c] justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Sparkles size={14} className="text-zinc-300" />
            <span className="text-xs font-semibold tracking-wide">Quantum AI recommendation</span>
          </div>
          <div className="bg-[#121214] border border-white/[0.05] p-4 rounded-xl shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.01] blur-xl rounded-full" />
            <p className="text-xs text-zinc-300 leading-relaxed relative z-10">
              Sprint velocity has dropped by 8% due to PR review lag in <strong className="text-white font-medium">api-gateway</strong>. Consider shifting contributors from auth-service.
            </p>
          </div>
        </div>
        <button className="w-full py-2.5 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] rounded-lg text-xs text-zinc-300 font-medium transition-all duration-300 hover:text-white">
          Optimize contributors
        </button>
      </div>
    )
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>("focus");
  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <section className="py-36 relative bg-[#09090b] overflow-hidden border-t border-white/[0.04] z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="max-w-4xl mb-24">
          <span className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.25em] block mb-4">Core Capabilities</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-zinc-100 tracking-tight leading-[1.12]">
            Engineered to streamline <br />
            <span className="gradient-text-gray">complex product delivery.</span>
          </h2>
        </div>

        {/* Features Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {features.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-2 relative group overflow-hidden ${
                  activeTab === f.id
                    ? "bg-[#121214] border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "bg-transparent border-transparent hover:bg-white/[0.01]"
                }`}
              >
                {activeTab === f.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-zinc-200 to-zinc-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className={`text-xs font-bold tracking-[0.2em] uppercase ${
                  activeTab === f.id ? "text-zinc-300" : "text-zinc-500"
                }`}>
                  {f.tagline}
                </span>
                
                <h3 className={`text-2xl font-semibold tracking-tight ${
                  activeTab === f.id ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-200 transition-colors"
                }`}>
                  {f.title}
                </h3>
                
                {activeTab === f.id && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-base text-zinc-400 leading-relaxed mt-2 font-light"
                  >
                    {f.description}
                  </motion.p>
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Visual Mockup using TiltCard */}
          <div className="lg:col-span-7 h-[440px] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_60%)] pointer-events-none" />
            
            <TiltCard 
              glowColor="rgba(255,255,255,0.05)"
              className="w-full h-full rounded-3xl border border-white/[0.08] bg-[#121214]/40 backdrop-blur-2xl overflow-hidden p-6 relative shadow-2xl flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full rounded-2xl border border-white/[0.08] bg-[#0a0a0c] shadow-2xl overflow-hidden"
                >
                  {activeFeature.preview}
                </motion.div>
              </AnimatePresence>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
