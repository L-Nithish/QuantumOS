import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EASE_PREMIUM } from "../../lib/motion";

const rows = [
  {
    feature: "Tool integration",
    traditional: "Fragmented across Jira, Notion, Slack, and metrics tools.",
    quantum: "A unified command workspace integrating issues, metrics, and communications.",
  },
  {
    feature: "Information search",
    traditional: "Slow, manual searches across dozens of distinct project pages.",
    quantum: "Contextual AI search box accessing your complete codebase index instantly.",
  },
  {
    feature: "Setup time",
    traditional: "Weeks of configuration, ticket schema mappings, and custom setups.",
    quantum: "2-minute secure repository sync with automated workspace configuration.",
  },
  {
    feature: "Workload balancing",
    traditional: "Reactive triage after developer burnout has already occurred.",
    quantum: "Predictive load monitoring indicating bottlenecks before sprints launch.",
  }
];

export default function Comparison() {
  return (
    <section className="py-36 relative bg-[#09090b] overflow-hidden border-t border-white/[0.04] z-10">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-24">
          <span className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.25em] block mb-4">The difference</span>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-100 leading-tight">
            Designed for execution. <br />
            <span className="gradient-text-gray">Built to replace complexity.</span>
          </h2>
        </div>

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="border border-white/[0.06] rounded-2xl bg-[#121214]/30 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.06] bg-[#0c0c0e] p-6 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            <div>Capability</div>
            <div className="mt-4 md:mt-0 text-zinc-500">Traditional tools</div>
            <div className="mt-2 md:mt-0 text-zinc-150">QuantumOS</div>
          </div>
          
          {/* Rows with stagger */}
          <div className="divide-y divide-white/[0.04]">
            {rows.map((row, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_PREMIUM }}
                className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 items-center hover:bg-white/[0.015] transition-colors duration-300"
              >
                <div className="text-base font-semibold text-zinc-300">{row.feature}</div>
                <div className="text-sm text-zinc-500 flex items-start gap-2.5">
                  <X size={16} className="text-zinc-800 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-light">{row.traditional}</span>
                </div>
                <div className="text-sm text-zinc-200 flex items-start gap-2.5 font-medium">
                  <Check size={16} className="text-zinc-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-light">{row.quantum}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
