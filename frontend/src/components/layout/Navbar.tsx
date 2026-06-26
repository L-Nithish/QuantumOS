import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "AI", to: "/ai-command-center" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingTop: scrolled ? "12px" : "20px" }}
    >
      <nav
        className="flex items-center gap-1 rounded-full px-1.5 py-1.5 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,12,0.85)" : "rgba(10,10,12,0.6)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(8px)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled
            ? "0 4px 24px -4px rgba(0,0,0,0.4)"
            : "0 8px 32px -8px rgba(0,0,0,0.3)",
        }}
      >
        <Link to="/" className="flex items-center gap-2 pl-3 pr-4 group">
          <div className="flex h-6 w-6 items-center justify-center rounded-[6px] text-[9px] font-bold text-zinc-950 bg-gradient-to-br from-titanium to-platinum">
            Q
          </div>
          <span className="text-[13px] font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
            QuantumOS
          </span>
        </Link>

        <div className="h-4 w-px mx-1 bg-white/[0.06]" />

        <div className="hidden sm:flex items-center gap-0.5 px-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                location.pathname === item.to ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {item.label}
              {location.pathname === item.to && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute bottom-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
                />
              )}
            </Link>
          ))}
          {isHome && (
            <a
              href="#walkthrough"
              className="px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              Demo
            </a>
          )}
        </div>

        <div className="h-4 w-px mx-1 bg-white/[0.06]" />

        <div className="flex items-center gap-2 pl-2 pr-1.5">
          {localStorage.getItem("quantumos_token") ? (
            <Link to="/dashboard">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-br from-titanium to-platinum border border-white/10"
              >
                Go to Dashboard
              </motion.span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[13px] text-zinc-500 font-medium hover:text-white transition-colors duration-300 px-2"
              >
                Login
              </Link>
              <Link to="/register">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-br from-titanium to-platinum border border-white/10"
                >
                  Get Started
                </motion.span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
