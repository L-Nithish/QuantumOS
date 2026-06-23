import { Command, Shield, Zap, Key, Cpu } from "lucide-react";
import TiltCard from "../ui/TiltCard";

export default function WhySection() {
  return (
    <section className="py-36 relative bg-[#121214]/30 overflow-hidden border-t border-white/[0.04] z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="max-w-4xl mb-24 text-center mx-auto">
          <span className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.25em] block mb-4">Why QuantumOS</span>
          <h2 className="text-5xl md:text-6xl font-semibold text-zinc-100 tracking-tight leading-tight">
            Designed for the demands of <br />
            <span className="gradient-text-gray">modern product engineering.</span>
          </h2>
        </div>

        {/* Bento Grid: 5 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 1: Keyboard First (Large - Col span 3) */}
          <TiltCard
            glowColor="rgba(255,255,255,0.05)"
            className="md:col-span-3 rounded-2xl border border-white/[0.06] bg-[#09090b] p-8 flex flex-col justify-between h-[360px] relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <Command size={18} className="text-zinc-300" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-100">Keyboard first design</h3>
              <p className="text-base text-zinc-400 max-w-sm leading-relaxed font-light">
                Execute commands, search tasks, switch views, and create issues in milliseconds with our global command bar.
              </p>
            </div>
            
            {/* Visual simulation */}
            <div className="absolute right-6 bottom-6 flex items-center gap-2.5 font-mono text-xs text-zinc-350 bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg backdrop-blur-sm select-none">
              <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 shadow-sm text-white">⌘</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 shadow-sm text-white">K</span>
              <span className="text-zinc-500 ml-1">to navigate</span>
            </div>
          </TiltCard>

          {/* Card 2: Sub-millisecond Speed (Medium - Col span 3) */}
          <TiltCard
            glowColor="rgba(255,255,255,0.05)"
            className="md:col-span-3 rounded-2xl border border-white/[0.06] bg-[#09090b] p-8 flex flex-col justify-between h-[360px] relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <Zap size={18} className="text-zinc-300" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-100">Sub-millisecond synchronization</h3>
              <p className="text-base text-zinc-400 max-w-sm leading-relaxed font-light">
                Built on a custom edge-database layer, ensuring state updates propagate to all team members instantly.
              </p>
            </div>
            
            {/* Visual simulation */}
            <div className="absolute right-6 bottom-6 flex items-center gap-2.5 bg-[#121214] border border-white/[0.06] px-4 py-2.5 rounded-lg select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-mono font-medium text-zinc-300">12ms latency</span>
            </div>
          </TiltCard>

          {/* Card 3: Enterprise Sovereignty (Small - Col span 2) */}
          <TiltCard
            glowColor="rgba(255,255,255,0.04)"
            className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-[#09090b] p-8 flex flex-col justify-between h-[320px] relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <Shield size={18} className="text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-100">Data Sovereignty</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Your code repositories and ticket histories are fully isolated. GDPR, HIPAA, and SOC2 compliant configurations are standard.
              </p>
            </div>
          </TiltCard>

          {/* Card 4: SSO & SAML (Small - Col span 2) */}
          <TiltCard
            glowColor="rgba(255,255,255,0.04)"
            className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-[#09090b] p-8 flex flex-col justify-between h-[320px] relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <Key size={18} className="text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-100">SSO & Directory Sync</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Connect Okta, Azure AD, or any SAML 2.0 provider to manage team accounts, permissions, and group provisioning instantly.
              </p>
            </div>
          </TiltCard>

          {/* Card 5: Customizable API Triggers (Small - Col span 2) */}
          <TiltCard
            glowColor="rgba(255,255,255,0.04)"
            className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-[#09090b] p-8 flex flex-col justify-between h-[320px] relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <Cpu size={18} className="text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-100">Workflow APIs</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Build triggers on ticket mutations, sync status changes with external environments, or connect your private server webhooks.
              </p>
            </div>
          </TiltCard>

        </div>

      </div>
    </section>
  );
}
