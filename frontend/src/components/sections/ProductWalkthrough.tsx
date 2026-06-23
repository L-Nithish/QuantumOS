import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, ListTodo, BarChart3, Sparkles, ArrowRight,
} from "lucide-react";
import { EASE_PREMIUM } from "../../lib/motion";
import TiltCard from "../ui/TiltCard";

const steps = [
  {
    id: "overview",
    icon: LayoutDashboard,
    title: "Command your workspace",
    description: "A unified overview of metrics, active projects, and team activity — everything you need at a glance.",
    preview: (
      <div className="space-y-5 p-6 bg-[#0a0a0c]">
        <div className="grid grid-cols-4 gap-3">
          {["142", "68", "2.4d", "3"].map((v, i) => (
            <div key={i} className="bg-[#121214] border border-white/[0.04] rounded-xl p-4 text-center">
              <p className="text-xl font-semibold text-zinc-100">{v}</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 tracking-wider">METRIC</p>
            </div>
          ))}
        </div>
        <div className="bg-[#121214] border border-white/[0.04] rounded-xl p-4 space-y-3">
          {["API Gateway Refactor", "Mobile App v3.0"].map((p, idx) => (
            <div key={p} className="flex justify-between items-center text-sm">
              <span className="text-zinc-200 font-medium">{p}</span>
              <span className={`text-xs font-mono px-2.5 py-1 rounded ${idx === 0 ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"}`}>
                {idx === 0 ? "On Track" : "At Risk"}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "tasks",
    icon: ListTodo,
    title: "Manage work with precision",
    description: "Filter, search, and track tasks across every project. Priority-aware views keep your team focused.",
    preview: (
      <div className="p-6 space-y-3 bg-[#0a0a0c]">
        {[
          { id: "TSK-401", title: "Rate limiting implementation", status: "In Progress", statusColor: "text-blue-400 bg-blue-500/10" },
          { id: "TSK-398", title: "Memory leak fix", status: "Todo", statusColor: "text-zinc-400 bg-zinc-800" },
          { id: "TSK-395", title: "Dark mode updates", status: "Review", statusColor: "text-purple-400 bg-purple-500/10" },
        ].map((t) => (
          <div key={t.id} className="flex items-center justify-between bg-[#121214] border border-white/[0.04] rounded-xl px-4 py-3.5 hover:border-white/10 transition-colors">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest">{t.id}</span>
              <p className="text-sm text-zinc-200 font-medium mt-1">{t.title}</p>
            </div>
            <span className={`text-[10px] font-mono px-2.5 py-1 rounded ${t.statusColor}`}>{t.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Data-driven decisions",
    description: "Sprint velocity, cycle time, and work distribution — analytics that inform strategy, not just reporting.",
    preview: (
      <div className="p-6 bg-[#0a0a0c]">
        <div className="flex items-end gap-3 h-32">
          {[65, 72, 58, 81, 76, 89, 98].map((h, i) => (
            <div key={i} className="flex-1 bg-white/[0.03] rounded-t-md relative flex flex-col justify-end h-full">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6 }}
                className={`w-full rounded-t-md ${i === 6 ? "bg-gradient-to-t from-zinc-500 to-zinc-200" : "bg-white/10"}`}
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "AI Command Center",
    description: "Workspace intelligence, risk detection, and AI recommendations — your signature advantage.",
    preview: (
      <div className="p-6 space-y-4 bg-[#0a0a0c]">
        <div className="bg-[#121214] border border-white/[0.04] rounded-xl p-4">
          <p className="text-[10px] text-zinc-500 font-mono tracking-wider mb-2">QUANTUM AI RECOMMENDATION</p>
          <p className="text-sm text-zinc-200 leading-relaxed">
            Mobile App v3.0 has elevated risk due to dependency blockages. Generate mitigation plan?
          </p>
        </div>
        <div className="flex gap-2">
          {["Generate Plan", "Decline", "View Logs"].map((a, idx) => (
            <span 
              key={a} 
              className={`text-xs font-mono px-3.5 py-1.5 rounded-full border cursor-pointer select-none transition-colors ${
                idx === 0 
                  ? "bg-white text-zinc-950 border-white font-semibold" 
                  : "bg-white/[0.02] text-zinc-400 border-white/[0.08] hover:bg-white/[0.05]"
              }`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ProductWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section id="walkthrough" className="py-36 bg-[#0a0a0c] border-t border-white/[0.04] relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="text-center mb-24"
        >
          <span className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.25em] block mb-4">Product Walkthrough</span>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-100">
            See how teams operate on QuantumOS
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed text-base sm:text-lg">
            From project setup to advanced AI intelligence — explore the full workspace experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left panel selectors */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-2 relative overflow-hidden ${
                  activeStep === i
                    ? "bg-[#121214] border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "bg-transparent border-transparent hover:bg-white/[0.01]"
                }`}
              >
                {activeStep === i && (
                  <motion.div 
                    layoutId="walkthrough-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-zinc-200 to-zinc-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                    activeStep === i ? "bg-white/[0.04] border-white/10" : "bg-white/[0.01] border-white/[0.04]"
                  }`}>
                    <s.icon size={16} className={activeStep === i ? "text-zinc-150" : "text-zinc-500"} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${activeStep === i ? "text-zinc-100" : "text-zinc-400"}`}>
                      {s.title}
                    </h3>
                    <p className="text-sm text-zinc-450 mt-1.5 leading-relaxed font-light">{s.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right visual console container using TiltCard */}
          <div className="lg:col-span-6 h-[400px] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_60%)] pointer-events-none" />
            
            <TiltCard
              glowColor="rgba(255,255,255,0.05)"
              className="w-full h-full rounded-3xl border border-white/[0.08] bg-[#121214]/40 backdrop-blur-2xl p-6 relative shadow-2xl flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 bg-grid-white/[0.012] bg-[size:32px_32px] pointer-events-none" />
              
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                className="w-full h-full rounded-2xl border border-white/[0.08] bg-[#09090b] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Console header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#0c0c0e] shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                  </div>
                  <span className="text-xs font-mono text-zinc-550 uppercase tracking-wider">QuantumOS — {step.id}</span>
                </div>
                {/* Step preview content */}
                <div className="flex-grow overflow-auto">
                  {step.preview}
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-100 transition-all duration-300 shadow-md"
          >
            Start free trial
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/ai-command-center"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            <Sparkles size={14} />
            Explore AI Command Center
          </Link>
        </div>
      </div>
    </section>
  );
}
