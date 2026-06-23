import { TrendingUp, TrendingDown, BarChart3, Activity, Users, Clock } from "lucide-react";

const metrics = [
  { label: "Velocity", value: "42 pts", change: "+18%", positive: true, icon: TrendingUp },
  { label: "Cycle Time", value: "2.1d", change: "-0.4d", positive: true, icon: Clock },
  { label: "Throughput", value: "68", change: "+12", positive: true, icon: Activity },
  { label: "Team Load", value: "78%", change: "+5%", positive: false, icon: Users },
];

const weeklyData = [65, 72, 58, 81, 76, 89, 94];
const projectBreakdown = [
  { name: "API Gateway", value: 34, color: "bg-zinc-300" },
  { name: "Mobile App", value: 28, color: "bg-zinc-500" },
  { name: "Design System", value: 22, color: "bg-zinc-400" },
  { name: "Security", value: 16, color: "bg-zinc-600" },
];

export default function Analytics() {
  const maxValue = Math.max(...weeklyData);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Analytics</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Workspace performance and delivery insights.</p>
        </div>
        <select className="px-3 py-1.5 text-[12px] bg-graphite border border-white/[0.05] rounded-md text-zinc-300 outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last quarter</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-graphite border border-white/[0.05] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-zinc-500 font-medium">{m.label}</span>
              <m.icon size={14} className="text-zinc-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold text-zinc-100">{m.value}</span>
              <span className={`text-[11px] font-medium mb-1 flex items-center gap-0.5 ${m.positive ? "text-zinc-400" : "text-zinc-500"}`}>
                {m.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-graphite border border-white/[0.05] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[14px] font-semibold text-zinc-200">Sprint Velocity</h2>
            <BarChart3 size={16} className="text-zinc-600" />
          </div>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-zinc-600 to-zinc-400 transition-all duration-500"
                  style={{ height: `${(val / maxValue) * 100}%` }}
                />
                <span className="text-[10px] text-zinc-600">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-graphite border border-white/[0.05] rounded-xl p-6">
          <h2 className="text-[14px] font-semibold text-zinc-200 mb-6">Work Distribution</h2>
          <div className="space-y-4">
            {projectBreakdown.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-zinc-400">{p.name}</span>
                  <span className="text-zinc-500">{p.value}%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
