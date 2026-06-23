import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import TiltCard from "../ui/TiltCard";
import { EASE_PREMIUM } from "../../lib/motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "For individuals and small teams.",
    features: ["Up to 5 members", "Unlimited tasks", "Basic analytics", "Community support"],
    button: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "/user/month",
    desc: "For growing teams that need more power.",
    features: ["Up to 50 members", "Advanced AI Assistant", "Custom workflows", "Priority support", "SSO integration"],
    button: "Start Free Trial",
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large organizations with complex needs.",
    features: ["Unlimited members", "Dedicated success manager", "Self-hosted option", "SLA guarantee", "Custom AI models"],
    button: "Contact Sales",
    highlight: false
  }
];

export default function Pricing({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="pricing" className={`relative bg-graphite border-t border-white/[0.04] z-10 ${standalone ? "py-28" : "py-36"}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 mb-6"
          >
            Simple pricing. <br />
            <span className="gradient-text-gray">No surprises.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_PREMIUM }}
              className="h-full"
            >
              <TiltCard
                glowColor={plan.highlight ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}
                className={`relative rounded-3xl border p-8 flex flex-col h-full cursor-pointer transition-all duration-500 ${
                  plan.highlight 
                    ? "bg-[#0c0c0e] border-white/20 shadow-[0_12px_40px_-12px_rgba(255,255,255,0.04)]" 
                    : "bg-[#09090b]/60 border-white/[0.06] backdrop-blur-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <span className="bg-zinc-100 text-zinc-950 text-[9px] font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">Most Popular</span>
                  </div>
                )}
                
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-semibold tracking-tight text-white">{plan.price}</span>
                  {plan.period && <span className="text-xs text-zinc-500 font-mono">{plan.period}</span>}
                </div>
                <p className="text-sm text-zinc-400 mb-8 h-10 font-light leading-relaxed">{plan.desc}</p>
                
                <Link
                  to="/register"
                  className={`block w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 mb-8 text-center ${
                    plan.highlight
                      ? "bg-white text-zinc-950 hover:bg-zinc-100 shadow-md"
                      : "bg-white/[0.02] text-zinc-200 border border-white/[0.08] hover:bg-white/[0.06]"
                  }`}
                >
                  {plan.button}
                </Link>
                
                <div className="space-y-4 mt-auto">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">Plan includes:</p>
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Check size={10} className="text-zinc-400" />
                      </div>
                      <span className="text-xs text-zinc-300 font-light">{f}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
