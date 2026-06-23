import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Brain, Layers, Shield, ArrowRight } from "lucide-react";
import { EASE_PREMIUM } from "../../lib/motion";
import Button from "../../components/ui/Button";

const capabilities = [
  {
    icon: Zap,
    title: "Instant Synchronization",
    description: "Every update synchronized across your team in single-digit milliseconds via our edge-compute network.",
  },
  {
    icon: Brain,
    title: "Contextual AI Agent",
    description: "Quantum AI understands your codebase, tickets, and conversations to deliver deeply contextual answers.",
  },
  {
    icon: Layers,
    title: "Infinite Canvas",
    description: "Map architecture, plan sprints, and draw connections on an infinite spatial workspace.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II, SSO, audit logs, and role-based access built for regulated industries.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="pt-28">
      <section className="section-padding px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="text-[12px] font-medium tracking-[0.15em] uppercase text-zinc-500 mb-6"
          >
            Platform Features
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tight leading-[1.1]"
          >
            Built for teams that move at velocity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
            className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            QuantumOS unifies project management, AI intelligence, and team collaboration into one operating system designed for modern enterprises.
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {capabilities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_PREMIUM }}
              className="bg-graphite border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.1] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
                <item.icon size={18} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-3">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto text-center bg-graphite border border-white/[0.06] rounded-2xl p-12">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-4">See it in action</h2>
          <p className="text-zinc-400 mb-8">Explore the AI Command Center — the signature intelligence layer of QuantumOS.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/ai-command-center">Open AI Command Center</Button>
            <Link
              to="/#walkthrough"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Watch product walkthrough
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
