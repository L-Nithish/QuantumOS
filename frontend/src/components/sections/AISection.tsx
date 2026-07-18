import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Command, ArrowRight } from "lucide-react";
import TiltCard from "../ui/TiltCard";
import { EASE_PREMIUM } from "../../lib/motion";

export default function AISection() {
  return (
    <section id="ai" className="py-36 relative bg-[#0a0a0c] overflow-hidden border-t border-white/[0.04] z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none blur-[40px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800/80 text-zinc-300 text-sm font-medium mb-6 shadow-sm"
          >
            <Sparkles size={13} className="text-zinc-200 animate-pulse" />
            <span>Quantum AI Agent</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_PREMIUM }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-100 mb-6 leading-none"
          >
            Your team's newest <br />
            <span className="gradient-text-ai">10x engineer.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
            className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Ask questions about your codebase, auto-assign tickets based on workload, and generate weekly reports with a single keystroke.
          </motion.p>
        </div>

        {/* Command Interface Mockup using TiltCard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
          className="max-w-4xl mx-auto"
        >
          <TiltCard
            glowColor="rgba(255,255,255,0.06)"
            className="relative rounded-2xl border border-white/[0.08] bg-[#121214]/60 backdrop-blur-2xl shadow-2xl overflow-hidden group cursor-pointer"
          >
            {/* Top Bar */}
            <div className="h-14 border-b border-white/[0.06] flex items-center px-5 justify-between bg-[#0c0c0e]">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-400 font-mono tracking-wider">
                <Command size={12} />
                <span>K — KERNEL PROMPT</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Input Area */}
            <div className="p-8 md:p-10 border-b border-white/[0.04] bg-[#0c0c0e]/30">
              <div className="flex flex-wrap items-center gap-3.5 text-xl md:text-3xl font-light text-zinc-200">
                <Sparkles className="text-zinc-400 shrink-0" size={24} />
                <span className="opacity-50">Summarize the latest changes in</span>
                <span className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-200 font-medium text-base md:text-xl border border-zinc-700/50 font-mono">api-gateway</span>
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-0.5 h-7 bg-zinc-400"
                />
              </div>
            </div>

            {/* Results Area */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-white/[0.01] to-transparent">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                    <Sparkles size={14} className="text-zinc-950" />
                  </div>
                  <div className="flex-1 pt-0.5 text-zinc-300 text-[15px] leading-relaxed font-light">
                    The latest updates in <span className="text-white font-medium">api-gateway</span> include migrating authentication to the new JWT service and adding rate limiting to the core endpoints. These changes successfully passed CI/CD pipeline and were merged by <span className="text-zinc-400">@sarah</span> 2 hours ago.
                  </div>
                </div>

                <div className="ml-12 pt-4 flex flex-wrap gap-3">
                  <Link to="/ai-command-center" className="px-5 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.05] text-sm font-semibold text-zinc-300 transition-all duration-300 flex items-center gap-2">
                    Open Command Center <ArrowRight size={14} />
                  </Link>
                  <Link to="/tasks" className="px-5 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.05] text-sm font-semibold text-zinc-300 transition-all duration-300 flex items-center gap-2">
                    View Tasks <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
