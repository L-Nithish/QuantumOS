import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Command, Activity, Cpu, Zap, ArrowUpRight, BarChart3, Users, Network, Database, Search, ShieldCheck, Terminal, Server } from "lucide-react";
import HeroBackground from "../animations/HeroBackground";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for the massive 3D product mockup
  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  
  // Transform values for the text fading out on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#120f17] text-zinc-100 overflow-visible z-20"
      style={{ height: "200vh" }}
    >
      {/* Absolute container that sticks to the top of the viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-32 md:pt-40 overflow-visible perspective-[2000px]">
        
        {/* React Bits Silk Shader Background */}
        <HeroBackground 
          speed={5.0}
          scale={1.0}
          noiseIntensity={1.5}
          bgColor="#120f17"
          silkColor="#7b7481"
        />

        {/* Hero Copy (Fades out on scroll) */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 flex flex-col items-center text-center max-w-5xl px-6"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-zinc-300 mb-8"
          >
            <Sparkles size={14} className="text-zinc-400" />
            <span className="tracking-wide">Introducing QuantumOS Architecture</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] pb-4 text-white"
          >
              Engineering <br />
              Unleashed.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl font-light leading-relaxed"
          >
            The world's most powerful execution environment. Redesigned from the ground up to unite code, planning, and deployment into a single spatial continuum.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/register">
              <button className="group relative px-8 py-4 bg-white text-black font-semibold text-sm md:text-base tracking-wide rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  Initialize System <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </Link>
            <a href="#walkthrough">
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold text-sm md:text-base tracking-wide rounded-full hover:bg-white/5 transition-colors">
                Read the Manifesto
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* The 3D Mockup Container (Flattens and scales up on scroll) */}
        <motion.div 
          style={{ 
            rotateX, 
            scale, 
            opacity, 
            y: translateY,
            transformStyle: "preserve-3d" 
          }}
          className="absolute top-[80vh] md:top-[85vh] z-10 w-full max-w-[90vw] md:max-w-7xl px-6 origin-top"
        >
          {/* Glass Mockup Outer Frame */}
          <div className="w-full aspect-[16/10] md:aspect-video rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-3xl shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none">
            
            {/* Mockup Header */}
            <div className="h-12 border-b border-white/10 bg-white/[0.02] flex items-center px-6 justify-between shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
                <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
                <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 bg-white/[0.02] px-4 py-1.5 rounded border border-white/5">
                <span className="flex items-center gap-2"><Command size={12}/> workspace.quantumos.dev</span>
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Mockup Body - Dense Premium Dashboard Simulation */}
            <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden bg-[#0A0A0A] border-t border-white/5">
               {/* Left Sidebar */}
               <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl z-10 shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
                 <div className="p-5 border-b border-white/5 bg-white/[0.01]">
                   <div className="flex items-center gap-3 text-white font-medium text-sm">
                     <div className="p-1.5 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                       <Command size={14} className="text-white" />
                     </div>
                     Quantum Core Engine
                   </div>
                 </div>
                 <div className="flex-1 py-4 flex flex-col gap-1 px-3">
                   <div className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2 px-2">System Modules</div>
                   {[
                     { icon: Activity, label: "Live Telemetry", active: true },
                     { icon: Network, label: "Edge Global Network" },
                     { icon: Database, label: "Vector Database" },
                     { icon: Server, label: "Compute Nodes" },
                     { icon: Users, label: "Identity & Access" },
                     { icon: ShieldCheck, label: "Security Center" },
                   ].map((item, i) => (
                     <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${item.active ? 'bg-violet-500/10 text-violet-300 shadow-[inset_1px_0_0_rgba(139,92,246,1)]' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}>
                       <item.icon size={14} className={item.active ? 'text-violet-400' : ''} />
                       {item.label}
                       {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />}
                     </div>
                   ))}
                 </div>
                 <div className="p-5 border-t border-white/5 bg-white/[0.01]">
                   <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                       <span className="text-[10px] text-white/60 font-medium uppercase tracking-wider">All Systems Nominal</span>
                     </div>
                     <span className="text-[10px] text-emerald-400 font-mono">100%</span>
                   </div>
                   <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-full" />
                   </div>
                 </div>
               </div>
               
               {/* Main Content Area */}
               <div className="flex-1 flex flex-col h-full bg-[#050505] relative z-0">
                 {/* Top Stats Row */}
                 <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-20">
                    {[
                      { label: "Live Traffic", val: "245.2k", unit: "req/s", change: "+12.4%", trend: "up", color: "text-violet-400" },
                      { label: "Global Latency", val: "12", unit: "ms", change: "-2.1%", trend: "down", color: "text-emerald-400" },
                      { label: "Compute Load", val: "42.8", unit: "%", change: "+1.2%", trend: "up", color: "text-blue-400" },
                      { label: "Active Nodes", val: "1,024", unit: "", change: "0%", trend: "neutral", color: "text-white" },
                    ].map((stat, i) => (
                      <div key={i} className="p-5 border-r border-white/5 last:border-r-0 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors cursor-default relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${stat.color.split('-')[1]}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">{stat.label}</div>
                        <div className="flex items-end gap-1 relative z-10">
                          <span className={`text-3xl font-light tracking-tight ${stat.color}`}>{stat.val}</span>
                          <span className="text-xs font-medium text-white/30 mb-1.5">{stat.unit}</span>
                        </div>
                        <div className={`text-[10px] mt-3 font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-emerald-400' : stat.trend === 'down' ? 'text-emerald-400' : 'text-white/30'}`}>
                          {stat.trend !== 'neutral' && <ArrowUpRight size={12} className={stat.trend === 'down' ? 'rotate-90' : ''} />}
                          {stat.change} vs last hr
                        </div>
                      </div>
                    ))}
                 </div>

                 {/* Main Graph Area */}
                 <div className="flex-1 p-6 relative overflow-hidden flex flex-col min-h-[300px]">
                   <div className="absolute inset-0 pointer-events-none z-0">
                     {/* Cyberpunk Grid Lines */}
                     <div className="w-full h-full flex flex-col justify-between opacity-10">
                       {[1,2,3,4,5,6].map(i => <div key={`h-${i}`} className="w-full border-t border-white border-dashed" />)}
                     </div>
                     <div className="absolute inset-0 flex justify-between opacity-[0.03]">
                       {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => <div key={`v-${i}`} className="h-full border-l border-white" />)}
                     </div>
                     {/* Ambient Glow */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/10 blur-[120px] rounded-full" />
                   </div>

                   <div className="flex justify-between items-center mb-8 relative z-10">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                         <BarChart3 size={16} />
                       </div>
                       <div>
                         <div className="text-sm font-semibold text-white/90">System Velocity Matrix</div>
                         <div className="text-[10px] text-white/40 font-mono mt-0.5">Real-time throughput analysis</div>
                       </div>
                     </div>
                     <div className="flex gap-1 bg-white/5 p-1 rounded-md border border-white/10">
                       {['1H', '24H', '7D', '30D'].map((t, i) => (
                         <div key={t} className={`text-[10px] font-semibold px-3 py-1 rounded cursor-pointer transition-colors ${i === 1 ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}>{t}</div>
                       ))}
                     </div>
                   </div>

                   <div className="flex-1 flex items-end gap-[2px] relative z-10 mt-auto w-full max-h-[220px]">
                     {/* Dense High-Res Bar Chart */}
                     {Array.from({ length: 60 }).map((_, i) => {
                       const height = 20 + Math.sin(i * 0.2) * 30 + Math.cos(i * 0.5) * 20 + Math.random() * 30;
                       const normalizedHeight = Math.max(10, Math.min(100, height));
                       const isPeak = i === 42;
                       return (
                         <motion.div
                           key={`bar-${i}`}
                           initial={{ height: 0 }}
                           whileInView={{ height: `${normalizedHeight}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.2, delay: i * 0.015, ease: [0.16, 1, 0.3, 1] }}
                           className={`flex-1 rounded-t-[2px] relative group/bar transition-all duration-300 ${isPeak ? 'bg-gradient-to-t from-violet-600 to-fuchsia-400 shadow-[0_0_20px_rgba(192,132,252,0.6)] z-20' : 'bg-white/10 hover:bg-white/30'}`}
                         >
                           {isPeak && (
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-violet-500/50 text-white text-[10px] font-mono px-3 py-1.5 rounded-md opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-xl flex flex-col items-center gap-1">
                               <span className="text-violet-300 font-bold">PEAK DETECTED</span>
                               <span>99.9% / 12.4k req</span>
                             </div>
                           )}
                         </motion.div>
                       );
                     })}
                   </div>
                 </div>

                 {/* Bottom Logs Panel */}
                 <div className="h-48 border-t border-white/5 bg-black/60 p-0 flex flex-col relative z-20 font-mono text-[11px]">
                   <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                     <div className="flex items-center gap-2 text-white/50 font-semibold tracking-widest uppercase text-[10px]">
                       <Terminal size={12} /> Quantum Hypervisor Logs
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] text-white/40">Live Stream connected</span>
                     </div>
                   </div>
                   <div className="flex-1 overflow-hidden p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                     {[
                       { time: "14:23:01.442", src: "[core-sys]", msg: "Allocating 4 new compute nodes in us-east-1 region", status: "OK", color: "text-emerald-400" },
                       { time: "14:22:59.102", src: "[mem-mgr]", msg: "Garbage collection cycle completed (142ms) - Freed 4.2GB", status: "OK", color: "text-emerald-400" },
                       { time: "14:22:15.891", src: "[sec-ops]", msg: "Detected traffic anomaly from IP 192.168.1.42 -> Scaling auto-groups", status: "WARN", color: "text-amber-400" },
                       { time: "14:21:05.000", src: "[db-sync]", msg: "Vector database checkpoint successfully committed across 3 AZs", status: "OK", color: "text-emerald-400" },
                       { time: "14:20:44.112", src: "[api-gw]",  msg: "Rate limit triggered for tenant workspace_78291", status: "INFO", color: "text-blue-400" },
                     ].map((log, i) => (
                       <div key={`log-${i}`} className="flex justify-between items-center group hover:bg-white/5 py-1 px-2 rounded-sm -mx-2 cursor-default transition-colors">
                         <div className="flex gap-4">
                           <span className="text-white/30 w-24 shrink-0">{log.time}</span>
                           <span className="text-violet-400/60 w-20 shrink-0">{log.src}</span>
                           <span className="text-white/60 group-hover:text-white transition-colors">{log.msg}</span>
                         </div>
                         <span className={`${log.color} font-bold ml-4`}>{log.status}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}