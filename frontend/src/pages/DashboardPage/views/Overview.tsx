import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, Target, CheckCircle2, Circle, Clock
} from "lucide-react";
import { projectService, type Project } from "../../../api/projectService";
import { taskService, type Task } from "../../../api/taskService";
import { activityService, type ActivityLog } from "../../../api/activityService";
import { workspaceService } from "../../../api/workspaceService";
import { analyticsService } from "../../../api/analyticsService";
import type { DashboardMetricsResponse } from "../../../api/analyticsService";

export default function Overview() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ws = await workspaceService.getDefaultWorkspace();
        const [projectsData, tasksData, activitiesData, metricsData] = await Promise.all([
          projectService.getAllProjects(),
          taskService.getAllTasks(),
          activityService.getAllActivity(),
          analyticsService.getWorkspaceDashboard(ws.id)
        ]);
        setProjects(projectsData);
        setTasks(tasksData);
        setActivities(activitiesData);
        setMetrics(metricsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Overview</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Here's what's happening in your workspace today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-[12px] font-medium text-zinc-300 bg-white/[0.02] border border-white/[0.05] rounded-md hover:bg-white/[0.05] transition-colors">
            Customize
          </button>
          <button className="px-3 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 hover:from-zinc-100 hover:to-zinc-300 rounded-md shadow-sm transition-colors border border-white/10">
            Share Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Issues" value={loading ? "-" : (metrics?.activeIssues.toString() || "0")} trend="+12%" positive />
        <MetricCard title="Resolved (7d)" value={loading ? "-" : (metrics?.resolved7d.toString() || "0")} trend="0" positive />
        <MetricCard title="Avg Resolution" value={loading ? "-" : (metrics?.avgResolution || "0d")} trend="0" positive />
        <MetricCard title="Blockers" value={loading ? "-" : (metrics?.blockers.toString() || "0")} trend="0" positive={false} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Projects */}
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-zinc-200">Active Projects</h2>
              <Link to="/projects" className="text-[12px] text-zinc-400 hover:text-zinc-200 font-medium transition-colors">View All</Link>
            </div>
            <div className="p-2 space-y-1 min-h-[150px]">
              {loading ? (
                <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">No active projects</div>
              ) : (
                projects.map((p, i) => (
                  <ProjectRow 
                    key={p.id || i}
                    name={p.name} 
                    progress={p.progress ?? 0} 
                    team={p.teamName || "Engineering"} 
                    status={p.status || "On Track"} 
                    color={i % 2 === 0 ? "from-zinc-400 to-zinc-600" : "from-zinc-500 to-zinc-700"} 
                  />
                ))
              )}
            </div>
          </div>

          {/* Recent Issues */}
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-zinc-200">My Issues</h2>
              <div className="flex gap-2">
                <span className="text-[11px] font-medium px-2 py-1 bg-white/[0.03] text-zinc-300 rounded border border-white/[0.04] cursor-pointer hover:bg-white/[0.06]">All</span>
                <span className="text-[11px] font-medium px-2 py-1 bg-transparent text-zinc-500 rounded cursor-pointer hover:text-zinc-300">Unread</span>
              </div>
            </div>
            <div className="divide-y divide-white/[0.03] min-h-[150px]">
              {loading ? (
                <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">Loading issues...</div>
              ) : tasks.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">No active issues</div>
              ) : (
                tasks.slice(0, 5).map((t, i) => (
                  <IssueRow 
                    key={t.id || i} 
                    id={t.id ? t.id.substring(0, 8) : `TSK-${i}`} 
                    title={t.title} 
                    priority={t.priority || "Medium"} 
                    status={t.status || "Todo"} 
                    date="Today" 
                  />
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          
          {/* AI Assistant Panel Removed */}

          {/* Team Activity */}
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-white/[0.05]">
              <h2 className="text-[14px] font-semibold text-zinc-200">Activity Feed</h2>
            </div>
            <div className="p-5 space-y-4">
              {loading ? (
                <div className="text-center text-zinc-500 text-sm">Loading activity...</div>
              ) : activities.length === 0 ? (
                <div className="text-center text-zinc-500 text-sm">No recent activity</div>
              ) : (
                activities.slice(0, 5).map((activity, i) => (
                  <ActivityItem 
                    key={activity.id || i}
                    user={activity.user?.username || "User"} 
                    action={activity.action} 
                    target={activity.metaData || "item"} 
                    time="Recent" 
                    color={i % 2 === 0 ? "bg-zinc-600" : "bg-zinc-700"} 
                    icon={<Clock size={10} className="text-white" />}
                  />
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, positive }: { title: string; value: string; trend: string; positive: boolean }) {
  return (
    <div className="bg-[#121214] border border-white/[0.05] p-4 rounded-xl shadow-sm relative overflow-hidden group hover:border-white/[0.08] transition-colors">
      <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-end gap-2.5">
        <span className="text-2xl font-semibold text-zinc-100 tracking-tight">{value}</span>
        <span className={`text-[12px] font-medium mb-1 ${positive ? 'text-zinc-300' : 'text-zinc-500'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function ProjectRow({ name, progress, team, status, color }: { name: string; progress: number; team: string; status: string; color: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.01] cursor-pointer transition-colors group">
      <div className="flex items-center gap-3 w-1/3">
        <div className="w-8 h-8 rounded-md bg-zinc-900 border border-white/[0.04] flex items-center justify-center shrink-0">
          <Target size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </div>
        <div className="min-w-0 pr-2">
          <p className="text-[13px] font-medium text-zinc-200 truncate">{name}</p>
          <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{team}</p>
        </div>
      </div>
      
      <div className="w-1/3 px-4 hidden sm:block">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-zinc-500">Progress</span>
          <span className="text-[11px] text-zinc-400 font-medium">{progress}%</span>
        </div>
        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="w-1/4 flex justify-end">
        <span className="px-2 py-1 text-[11px] font-medium rounded-md bg-white/[0.02] text-zinc-300 border border-white/[0.04] capitalize">
          {(status || "ACTIVE").replace("_", " ").toLowerCase()}
        </span>
      </div>
    </div>
  );
}

function IssueRow({ id, title, priority, status, date }: { id: string; title: string; priority: string; status: string; date: string }) {
  const getStatusIcon = (s: string) => {
    switch(s.toLowerCase()) {
      case 'done': return <CheckCircle2 size={14} className="text-zinc-400" />;
      case 'in progress': return <Circle size={14} className="text-zinc-300 fill-zinc-300/10" />;
      case 'in review': return <Activity size={14} className="text-zinc-300" />;
      default: return <Circle size={14} className="text-zinc-600" />;
    }
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.01] cursor-pointer transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
        <div className="shrink-0 text-zinc-500">{getStatusIcon(status)}</div>
        <span className="text-[12px] font-medium text-zinc-500 shrink-0">{id.toUpperCase()}</span>
        <span className="text-[13px] text-zinc-200 truncate group-hover:text-zinc-100 transition-colors">{title}</span>
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 w-20">
          <Activity size={12} className="text-zinc-400" />
          <span className="text-[11px] font-medium text-zinc-400 capitalize">{priority.toLowerCase()}</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-zinc-500 w-16 text-right">{date}</span>
      </div>
    </div>
  );
}

function ActivityItem({ user, action, target, status, time, color, icon }: { user: string; action: string; target: string; status?: string; time: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="relative mt-1">
        <div className={`w-5 h-5 rounded-full ${color} flex items-center justify-center shrink-0 ring-4 ring-[#121214] shadow-sm z-10 relative`}>
          {icon}
        </div>
        <div className="absolute top-5 left-1/2 -ml-[1px] w-[2px] h-[calc(100%+16px)] bg-white/[0.03] -z-0" />
      </div>
      <div className="flex-1 pb-4">
        <p className="text-[13px] text-zinc-400 leading-snug">
          <span className="font-medium text-zinc-200">{user}</span> {action} <span className="font-medium text-zinc-300">{target}</span>
          {status && <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-white/[0.04] rounded text-zinc-300">{status}</span>}
        </p>
        <p className="text-[11px] text-zinc-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
