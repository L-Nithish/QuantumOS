import { useState } from "react";
import { Link } from "react-router-dom";
import { Columns, Smartphone, Laptop, Sparkles } from "lucide-react";

export default function SplitView() {
  const [splitRatio, setSplitRatio] = useState<number>(50); // percentage for left pane
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="h-screen flex flex-col bg-[#09090b] text-zinc-300 font-sans select-none overflow-hidden">
      
      {/* Top Controller Bar */}
      <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-6 bg-[#09090b] shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-gradient-to-tr from-zinc-200 to-zinc-500 flex items-center justify-center text-zinc-950 text-[10px] font-bold">
            Q
          </div>
          <span className="text-[13px] font-semibold text-zinc-100 tracking-tight">QuantumOS workspace</span>
          <span className="text-zinc-700">/</span>
          <span className="text-xs text-zinc-400 font-medium bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05] flex items-center gap-1.5">
            <Sparkles size={11} className="text-zinc-300" /> Split Screen Preview
          </span>
        </div>

        {/* Layout Toggles */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSplitRatio(50)}
            className="p-1.5 rounded hover:bg-white/[0.03] text-zinc-400 hover:text-zinc-200 transition-colors text-xs flex items-center gap-1.5"
            title="Reset to 50:50 Split"
          >
            <Columns size={15} />
            <span>Reset Split</span>
          </button>
          <div className="h-4 w-px bg-white/[0.08]" />
          <button 
            onClick={() => setActiveDevice("desktop")}
            className={`p-1.5 rounded transition-colors ${activeDevice === "desktop" ? "bg-white/[0.06] text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Laptop size={16} />
          </button>
          <button 
            onClick={() => setActiveDevice("mobile")}
            className={`p-1.5 rounded transition-colors ${activeDevice === "mobile" ? "bg-white/[0.06] text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        {/* Back Link */}
        <Link to="/" className="text-[12px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
          Exit Preview
        </Link>
      </header>

      {/* Main workspace */}
      <div className="flex-1 flex relative overflow-hidden bg-[#050507]">
        
        {/* Left Pane - Landing Page */}
        <div 
          className="h-full relative overflow-hidden transition-all duration-300 ease-out border-r border-white/[0.06]" 
          style={{ width: `${splitRatio}%` }}
        >
          <div className="absolute top-3 left-4 z-10 px-2.5 py-1 rounded bg-[#09090b]/80 border border-white/[0.06] backdrop-blur text-[10px] font-medium text-zinc-400">
            LANDING PAGE (/)
          </div>
          <iframe 
            src="/" 
            className="w-full h-full border-none bg-[#09090b]" 
            title="Landing Page Preview"
          />
        </div>

        {/* Draggable Divider */}
        <div 
          className="absolute top-0 bottom-0 w-1.5 hover:w-2 bg-white/[0.04] hover:bg-zinc-500/30 cursor-col-resize z-30 transition-all duration-200"
          style={{ left: `calc(${splitRatio}% - 3px)` }}
          onMouseDown={() => {
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const percentage = (moveEvent.clientX / window.innerWidth) * 100;
              setSplitRatio(Math.min(Math.max(percentage, 20), 80));
            };
            const handleMouseUp = () => {
              window.removeEventListener("mousemove", handleMouseMove);
              window.removeEventListener("mouseup", handleMouseUp);
            };
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
          }}
        />

        {/* Right Pane - Dashboard */}
        <div 
          className="h-full relative overflow-hidden transition-all duration-300 ease-out" 
          style={{ width: `${100 - splitRatio}%` }}
        >
          <div className="absolute top-3 left-4 z-10 px-2.5 py-1 rounded bg-[#09090b]/80 border border-white/[0.06] backdrop-blur text-[10px] font-medium text-zinc-400">
            DASHBOARD (/dashboard/overview)
          </div>
          <iframe 
            src="/dashboard/overview" 
            className="w-full h-full border-none bg-[#09090b]" 
            title="Dashboard Preview"
          />
        </div>

      </div>

    </div>
  );
}
