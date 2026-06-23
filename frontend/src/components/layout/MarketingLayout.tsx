import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Lenis from "lenis";

export default function MarketingLayout() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Responsive linear interpolation (buttery smooth)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle scrolling when route or hash changes
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      // Find element for hash
      const element = document.querySelector(location.hash);
      if (element) {
        // Wait briefly for content rendering
        const timer = setTimeout(() => {
          lenisRef.current?.scrollTo(location.hash, {
            offset: -80,
            duration: 1.2, // Faster, punchier scroll reveal
          });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to top on standard navigation
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-300 font-sans overflow-x-hidden selection:bg-white/10 selection:text-white relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100] shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        style={{ scaleX }}
      />

      {/* Global Cinematic Mesh Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-80" />
      </div>

      <Navbar />

      {/* Page Transition Wrapper */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Outlet />
      </motion.div>

      <Footer />
    </div>
  );
}
