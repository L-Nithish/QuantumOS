import { motion } from "framer-motion";
import { EASE_PREMIUM } from "../../lib/motion";

const avatars = [
  { c: "from-zinc-200 to-zinc-400 text-zinc-950", label: "Product" },
  { c: "from-zinc-300 to-zinc-500 text-zinc-950", label: "Engineering" },
  { c: "from-zinc-400 to-zinc-600 text-zinc-950", label: "Design" },
  { c: "from-zinc-500 to-zinc-700 text-white", label: "Marketing" },
];

export default function Collaboration() {
  return (
    <section id="collaboration" className="py-36 relative bg-[#0a0a0c] overflow-hidden border-t border-white/[0.04] z-10">
      {/* Mesh glow behind the interactive hub */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-100 mb-6"
        >
          Built for <span className="gradient-text-gray">multiplayer.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_PREMIUM }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-24 font-light"
        >
          Manage workspaces, set granular RBAC permissions, and collaborate in real-time. Everything updates instantly for everyone.
        </motion.p>

        {/* Orbiting Nodes Canvas Container */}
        <div className="relative max-w-xl mx-auto h-[400px] flex items-center justify-center select-none">
          
          {/* Laser-guided SVG orbits */}
          <svg className="absolute w-[360px] h-[360px] pointer-events-none opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="2 4" />
            <motion.circle 
              cx="50" 
              cy="50" 
              r="42" 
              stroke="white" 
              strokeWidth="0.5" 
              fill="none" 
              strokeDasharray="10 30"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              style={{ transformOrigin: "center" }}
            />
          </svg>

          {/* Central Hub Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="z-20 absolute"
          >
            <div className="w-24 h-24 rounded-3xl bg-[#121214] border border-white/[0.08] shadow-[0_0_60px_rgba(255,255,255,0.06)] flex items-center justify-center p-2.5">
              <div className="w-full h-full border border-white/10 rounded-2xl bg-white/[0.02] flex items-center justify-center">
                <span className="font-mono font-semibold text-zinc-400 text-[10px] tracking-widest uppercase">Sync</span>
              </div>
            </div>
          </motion.div>

          {/* Infinite Orbiting Wrapper */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
            className="absolute w-[300px] h-[300px] flex items-center justify-center pointer-events-none"
          >
            {avatars.map((avatar, i) => {
              const angle = (i * Math.PI * 2) / avatars.length;
              const radius = 136;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* Counter-rotation to keep avatars and text vertical */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 32, ease: "linear", repeat: Infinity }}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${avatar.c} shadow-xl ring-4 ring-[#0a0a0c] flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-105 group-hover:ring-white/20`}>
                      {avatar.label[0]}
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 bg-[#09090b] px-2.5 py-0.5 rounded-full border border-white/[0.06] shadow-sm tracking-wide">
                      {avatar.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
