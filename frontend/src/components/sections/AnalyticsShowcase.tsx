import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { EASE_PREMIUM } from "../../lib/motion";
import TiltCard from "../ui/TiltCard";

export default function AnalyticsShowcase() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const barData = [
    { month: "Jan", val: 40 },
    { month: "Jan", val: 60 },
    { month: "Feb", val: 45 },
    { month: "Feb", val: 80 },
    { month: "Mar", val: 55 },
    { month: "Mar", val: 90 },
    { month: "Apr", val: 75 },
    { month: "Apr", val: 100 },
    { month: "May", val: 85 },
    { month: "May", val: 110 },
    { month: "Jun", val: 95 },
    { month: "Jun", val: 124 },
  ];

  return (
    <section id="analytics" className="py-36 relative bg-graphite overflow-hidden border-t border-white/[0.04] z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800 border border-zinc-700/50 text-zinc-300 text-sm font-medium mb-6"
            >
              <BarChart3 size={14} />
              <span>Insights & Velocity</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_PREMIUM }}
              className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-100 mb-6"
            >
              Measure what matters. <br />
              <span className="gradient-text-gray">Without the noise.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
              className="text-lg sm:text-xl text-zinc-400 mb-8 font-light leading-relaxed"
            >
              QuantumOS automatically tracks velocity, blocker frequency, and team health. Get actionable insights without manually tagging tickets.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_PREMIUM }}
              className="space-y-4"
            >
              {[
                { icon: <TrendingUp size={18} className="text-zinc-300" />, title: "Sprint Velocity", desc: "Predict delivery dates with 94% accuracy." },
                { icon: <Users size={18} className="text-zinc-400" />, title: "Team Load", desc: "Balance workloads to prevent burnout before it happens." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.04] bg-[#09090b]/40 backdrop-blur-sm">
                  <div className="mt-1 w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-base font-semibold text-zinc-200">{item.title}</h4>
                    <p className="text-sm text-zinc-450 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right Visual (Charts Mockup using TiltCard) */}
          <div className="relative">
            <TiltCard
              glowColor="rgba(255,255,255,0.04)"
              className="rounded-2xl border border-white/[0.08] bg-[#09090b] p-6 shadow-2xl relative z-10 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Team Velocity</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-semibold text-zinc-100 tracking-tight">124 pts</span>
                    <span className="text-xs text-emerald-400 font-medium mb-1">+14% vs last sprint</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {["1W", "1M", "3M"].map((tab) => (
                    <div 
                      key={tab} 
                      className={`w-9 h-8 rounded flex items-center justify-center text-xs font-mono border ${
                        tab === "1M" 
                          ? "bg-white/[0.06] border-white/10 text-white" 
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart Mockup with interactive tooltip */}
              <div className="h-48 flex items-end justify-between gap-2.5 pb-2 border-b border-white/[0.06] relative">
                {barData.map((b, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="flex-1 h-full flex flex-col justify-end group cursor-pointer relative"
                  >
                    {/* Tooltip on hover */}
                    {hoveredBar === i && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: -8, scale: 1 }}
                        className="absolute bottom-[105%] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs text-white font-mono z-30 shadow-md pointer-events-none"
                      >
                        {b.val}
                      </motion.div>
                    )}

                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${b.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.04, ease: EASE_PREMIUM }}
                      className={`w-full rounded-t-[2px] transition-colors duration-300 ${
                        hoveredBar === i
                          ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                          : i === 11 
                            ? 'bg-gradient-to-t from-zinc-500 to-zinc-200' 
                            : 'bg-white/[0.04]'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3.5 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </TiltCard>

            {/* Floating Bottleneck Alert Node */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-6 rounded-xl border border-white/[0.08] bg-[#0c0c0e] p-4.5 shadow-2xl z-20 select-none backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/[0.06] text-zinc-400 shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs text-zinc-550 font-semibold uppercase tracking-wider">Bottleneck flagged</p>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5">QA Review (+2.4d)</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
