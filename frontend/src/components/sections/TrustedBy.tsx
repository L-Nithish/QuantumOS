import { motion } from "framer-motion";

const companies = [
  { name: "Acme Corp", logo: "Acme" },
  { name: "GlobalTech", logo: "GlobalTech" },
  { name: "Quantum", logo: "Quantum" },
  { name: "Nexus", logo: "Nexus" },
  { name: "Starlight", logo: "Starlight" },
  { name: "Apex", logo: "Apex" },
];

// Duplicate list for infinite scroll loop
const tickerItems = [...companies, ...companies, ...companies];

export default function TrustedBy() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#09090b] z-10 border-t border-white/[0.02]">
      {/* Light edge masks for cinematic overlay */}
      <div className="absolute top-0 left-0 bottom-0 w-36 bg-gradient-to-r from-[#09090b] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-36 bg-gradient-to-l from-[#09090b] to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.25em] mb-10"
        >
          Powering the next generation of teams
        </motion.p>

        {/* Infinite Scroll Wrapper */}
        <div className="w-full overflow-hidden flex items-center">
          <motion.div
            animate={{ x: [0, -100 * companies.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-20 whitespace-nowrap min-w-full"
            style={{ width: `${companies.length * 200}px` }}
          >
            {tickerItems.map((company, i) => (
              <div
                key={`${company.name}-${i}`}
                className="text-xl md:text-2xl font-bold text-zinc-600 font-serif tracking-tighter hover:text-zinc-300 transition-colors duration-300 select-none cursor-pointer flex items-center justify-center w-36"
              >
                {company.logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
