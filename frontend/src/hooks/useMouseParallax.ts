import { useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Returns a ref to normalised mouse coordinates (-1..1)
 * using CSS custom properties to avoid React re-renders.
 * Attach the returned ref to a container element.
 */
export function useMouseParallax(smoothing = 0.06) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<MousePosition>({ x: 0, y: 0 });

  const getPos = useCallback(() => posRef.current, []);

  useEffect(() => {
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Only update if movement is significant
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        current.x += dx * smoothing;
        current.y += dy * smoothing;
        posRef.current = { x: current.x, y: current.y };

        // Update CSS custom properties on the container (no React re-render)
        if (containerRef.current) {
          containerRef.current.style.setProperty("--mx", `${current.x}`);
          containerRef.current.style.setProperty("--my", `${current.y}`);
        }
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [smoothing]);

  return { containerRef, getPos };
}
