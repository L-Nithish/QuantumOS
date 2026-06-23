import { motion } from "framer-motion";
import TiltCard from "../ui/TiltCard";
import { EASE_PREMIUM } from "../../lib/motion";

const testimonials = [
  {
    quote: "QuantumOS replaced five different tools for our engineering team. The AI agent alone saves us dozens of hours a week in triage.",
    author: "Sarah Jenkins",
    role: "VP of Engineering at Nexus",
    avatar: "S"
  },
  {
    quote: "The speed is just incredible. Every interaction feels instantaneous. It's the first project management tool our developers actually enjoy using.",
    author: "David Chen",
    role: "CTO at Starlight",
    avatar: "D"
  },
  {
    quote: "We scaled from 50 to 500 engineers without changing our workflow, thanks to QuantumOS. The spatial canvas revolutionized our planning.",
    author: "Elena Rodriguez",
    role: "Head of Product at Apex",
    avatar: "E"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-36 relative bg-charcoal overflow-hidden border-t border-white/[0.04] z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
           <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100"
          >
            Loved by the best.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_PREMIUM }}
              className="h-full"
            >
              <TiltCard
                glowColor="rgba(255,255,255,0.04)"
                className="p-8 rounded-3xl bg-[#121214]/30 border border-white/[0.06] backdrop-blur-sm h-full flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="text-zinc-600 mb-6">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M10 16c0-4.4 3.6-8 8-8v4c-2.2 0-4 1.8-4 4h4v8H10v-8zm12 0c0-4.4 3.6-8 8-8v4c-2.2 0-4 1.8-4 4h4v8H22v-8z" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-10 font-light">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 border-t border-white/[0.04] pt-6 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/[0.08] flex items-center justify-center text-zinc-200 font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{t.author}</p>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-wide">{t.role}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
