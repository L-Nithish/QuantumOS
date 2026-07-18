import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, BarChart2, Calendar, Clock, Target, TrendingUp, Users } from "lucide-react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { workspaceService } from "../../../api/workspaceService";
import { analyticsService } from "../../../api/analyticsService";
import type { DashboardMetricsResponse } from "../../../api/analyticsService";

export default function Analytics() {
  const [metrics, setMetrics] = useState<DashboardMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ws = await workspaceService.getDefaultWorkspace();
        const data = await analyticsService.getWorkspaceDashboard(ws.id);
        setMetrics(data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const kpis = metrics ? [
    { label: "Velocity", value: metrics.velocity, change: "+12%", trend: "up", icon: TrendingUp },
    { label: "Cycle Time", value: metrics.cycleTime, change: "-8%", trend: "down", icon: Clock },
    { label: "Throughput", value: `${metrics.throughput} tasks`, change: "+4%", trend: "up", icon: Target },
    { label: "Team Load", value: metrics.teamLoad, change: "+2%", trend: "up", icon: Users },
  ] : [
    { label: "Velocity", value: "-", change: "-", trend: "up", icon: TrendingUp },
    { label: "Cycle Time", value: "-", change: "-", trend: "down", icon: Clock },
    { label: "Throughput", value: "-", change: "-", trend: "up", icon: Target },
    { label: "Team Load", value: "-", change: "-", trend: "up", icon: Users },
  ];

  // Map weeklyData array from API to chart format
  const weeklyDataRaw = metrics?.weeklyData || [0,0,0,0,0,0,0];
  const chartData = [
    { name: 'Mon', completed: weeklyDataRaw[0], added: 45 },
    { name: 'Tue', completed: weeklyDataRaw[1], added: 52 },
    { name: 'Wed', completed: weeklyDataRaw[2], added: 48 },
    { name: 'Thu', completed: weeklyDataRaw[3], added: 61 },
    { name: 'Fri', completed: weeklyDataRaw[4], added: 55 },
    { name: 'Sat', completed: weeklyDataRaw[5], added: 30 },
    { name: 'Sun', completed: weeklyDataRaw[6], added: 25 },
  ];

  const projectDistribution = metrics?.projectBreakdown || [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Analytics</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Track team performance and project metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-300 bg-graphite border border-white/10 rounded-md hover:bg-white/[0.02] transition-colors">
            <Calendar size={14} />
            Last 7 days
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-md">
            <BarChart2 size={14} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-graphite border border-white/[0.05] rounded-xl p-5 hover:border-white/[0.08] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-charcoal rounded-lg border border-white/[0.04]">
                <kpi.icon size={16} className="text-zinc-400" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
                kpi.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </div>
            </div>
            <p className="text-2xl font-semibold text-zinc-100">{loading ? "-" : kpi.value}</p>
            <p className="text-[12px] text-zinc-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-graphite border border-white/[0.05] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[14px] font-semibold text-zinc-200">Sprint Velocity</h2>
              <p className="text-[12px] text-zinc-500 mt-1">Story points completed vs added</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a1a1aa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#a1a1aa" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={2} />
                <Line type="monotone" dataKey="added" stroke="#52525b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-graphite border border-white/[0.05] rounded-xl p-6">
          <h2 className="text-[14px] font-semibold text-zinc-200 mb-6">Work Distribution</h2>
          <div className="space-y-6">
            {loading ? (
              <p className="text-zinc-500 text-sm">Loading...</p>
            ) : projectDistribution.map((project, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[13px] font-medium text-zinc-300">{project.name}</p>
                  <p className="text-[12px] text-zinc-500">{project.value}%</p>
                </div>
                <div className="h-2 w-full bg-charcoal rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${project.color} rounded-full`} 
                    style={{ width: `${project.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
