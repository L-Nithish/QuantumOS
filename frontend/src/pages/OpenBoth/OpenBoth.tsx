import { useEffect } from "react";
import { ExternalLink } from "lucide-react";

export default function OpenBoth() {
  const triggerOpen = () => {
    window.open("/", "_blank");
    window.open("/dashboard/overview", "_blank");
  };

  useEffect(() => {
    triggerOpen();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#09090b] text-zinc-300 font-sans p-6 text-center select-none">
      <div className="max-w-md p-8 rounded-2xl border border-white/[0.08] bg-[#121214] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-zinc-200 to-zinc-500 flex items-center justify-center text-zinc-950 text-xl font-bold mx-auto mb-6 shadow-md">
          Q
        </div>

        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">Opening QuantumOS Pages</h1>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          We are launching both the Landing Page and the Enterprise Dashboard in new browser tabs.
        </p>

        <button 
          onClick={triggerOpen}
          className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 hover:from-zinc-100 hover:to-zinc-300 transition-colors border border-white/10 flex items-center justify-center gap-2"
        >
          <ExternalLink size={15} />
          <span>Launch Tabs Again</span>
        </button>

        <div className="mt-6 flex flex-col gap-2 text-xs text-zinc-500 border-t border-white/[0.04] pt-4">
          <div className="flex justify-between">
            <span>Landing Page:</span>
            <a href="/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:underline">/</a>
          </div>
          <div className="flex justify-between">
            <span>Dashboard:</span>
            <a href="/dashboard/overview" target="_blank" rel="noreferrer" className="text-zinc-400 hover:underline">/dashboard/overview</a>
          </div>
        </div>
      </div>
    </div>
  );
}
