import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE_PREMIUM } from "../../lib/motion";

const faqs = [
  {
    q: "How does QuantumOS integrate with our existing codebase?",
    a: "QuantumOS connects securely to your GitHub, GitLab, or Bitbucket repositories via OAuth. Our AI agent then indexes your codebase to provide contextual answers and automated issue triaging."
  },
  {
    q: "Is our data used to train your AI models?",
    a: "No. Enterprise customer data is never used to train our base models. Your code and internal communications remain strictly isolated within your organization's tenant."
  },
  {
    q: "Can we self-host QuantumOS?",
    a: "Yes, self-hosting via VPC or on-premise is available on our Enterprise plan. We provide Kubernetes manifests and Helm charts for seamless deployment."
  },
  {
    q: "How fast is the synchronization across devices?",
    a: "Changes propagate to all connected clients in under 50ms globally, thanks to our custom edge-compute infrastructure."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-36 relative bg-graphite overflow-hidden border-t border-white/[0.04] z-10">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="text-4xl font-semibold tracking-tight text-zinc-100"
          >
            Frequently asked questions.
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_PREMIUM }}
                className={`border rounded-2xl transition-colors duration-500 overflow-hidden cursor-pointer select-none ${
                  isOpen 
                    ? "bg-[#09090b] border-white/10" 
                    : "bg-[#09090b]/40 border-white/[0.06] hover:bg-[#09090b]/60 hover:border-white/[0.08]"
                }`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div 
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium text-zinc-200">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                    className="text-zinc-500 shrink-0 ml-4"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                    >
                      <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
