import { motion } from "framer-motion";

const panelReveal = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const Panel = ({
  children,
  className = "",
  style = {},
  delay = 0,
  depth = 1,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  depth?: number;
}) => {
  const tx = `calc(var(--mx, 0) * ${depth * 6}px)`;
  const ty = `calc(var(--my, 0) * ${depth * 4}px)`;

  return (
    <motion.div
      variants={panelReveal(delay)}
      initial="hidden"
      animate="visible"
      className={`absolute select-none pointer-events-none ${className}`}
      style={{
        translate: `${tx} ${ty}`,
        transition: "translate 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      <div
        className="rounded-2xl overflow-hidden border border-white/[0.06] bg-graphite/80"
        style={{
          boxShadow: "0 24px 48px -12px rgba(0,0,0,0.4)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const CommandCenter = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Velocity chart — top right */}
      <Panel depth={0.5} delay={0.5} className="w-[240px]" style={{ top: "10%", right: "6%" }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-zinc-400 font-medium">Team Velocity</span>
            <span className="text-[9px] text-zinc-300">↑ 23%</span>
          </div>
          <svg width="100%" height="40" viewBox="0 0 220 40" fill="none" className="opacity-80">
            <motion.path
              d="M0 32 Q40 28, 80 22 T160 14 T220 8"
              stroke="#d4d4d8"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <span className="text-[15px] font-semibold text-zinc-100">847</span>
              <p className="text-[8px] text-zinc-600 mt-0.5">tasks / week</p>
            </div>
            <div className="h-5 w-px bg-white/5" />
            <div>
              <span className="text-[15px] font-semibold text-zinc-100">42</span>
              <p className="text-[8px] text-zinc-600 mt-0.5">contributors</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* AI metrics — bottom right */}
      <Panel depth={1} delay={0.7} className="w-[200px]" style={{ bottom: "14%", right: "10%" }}>
        <div className="p-4">
          <span className="text-[9px] text-zinc-500 font-medium tracking-wider uppercase">AI Intelligence</span>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[18px] font-semibold text-zinc-100">94%</p>
              <p className="text-[8px] text-zinc-600">accuracy</p>
            </div>
            <div className="h-8 w-px bg-white/5" />
            <div>
              <p className="text-[18px] font-semibold text-zinc-100">2</p>
              <p className="text-[8px] text-zinc-600">risks flagged</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Activity feed — bottom left */}
      <Panel depth={-0.8} delay={0.9} className="w-[190px]" style={{ bottom: "20%", left: "6%" }}>
        <div className="p-3.5">
          <span className="text-[9px] text-zinc-500 font-medium tracking-wider uppercase">Live Activity</span>
          <div className="mt-2.5 flex flex-col gap-2">
            {[
              { name: "Sarah K.", action: "deployed v2.4", time: "now" },
              { name: "Alex M.", action: "merged PR #312", time: "2m" },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-4 h-4 rounded-full bg-zinc-500 flex items-center justify-center text-[6px] font-bold text-zinc-950 shrink-0">
                  {a.name[0]}
                </div>
                <p className="text-[9px] text-zinc-400 truncate flex-1">
                  <span className="text-zinc-200 font-medium">{a.name}</span> {a.action}
                </p>
                <span className="text-[7px] text-zinc-600 shrink-0">{a.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default CommandCenter;
