import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Circle, CheckCircle2, Clock, Filter, Plus, Search, AlertTriangle,
} from "lucide-react";
import { taskService, type Task } from "../../../api/taskService";
import { projectService, type Project } from "../../../api/projectService";



const priorityStyles: Record<string, string> = {
  urgent: "text-red-400 bg-red-950/30 border-red-900/30",
  high: "text-orange-400 bg-orange-950/20 border-orange-900/20",
  medium: "text-zinc-400 bg-zinc-800/50 border-zinc-700/50",
  low: "text-zinc-500 bg-zinc-900 border-zinc-800",
};

const statusIcons: Record<string, React.ReactNode> = {
  todo: <Circle size={14} className="text-zinc-600" />,
  in_progress: <Clock size={14} className="text-zinc-400" />,
  in_review: <AlertTriangle size={14} className="text-zinc-300" />,
  done: <CheckCircle2 size={14} className="text-zinc-300" />,
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksData, projectsData] = await Promise.all([
          taskService.getAllTasks(),
          projectService.getAllProjects()
        ]);
        setTasks(tasksData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = tasks.filter((t) => {
    const matchesFilter = filter === "all" || t.status?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = t.title?.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Tasks</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Track and manage work across all projects.</p>
        </div>
        <Link to="/dashboard/issues" state={{ openModal: true }} className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-md border border-white/10">
          <Plus size={14} />
          New Task
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-graphite border border-white/[0.05] flex-1 max-w-sm">
          <Search size={14} className="text-zinc-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-sm text-zinc-200 placeholder:text-zinc-600"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <Filter size={14} className="text-zinc-500 shrink-0" />
          {(["all", "todo", "in_progress", "in_review", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-colors shrink-0 ${
                filter === f ? "bg-white/[0.06] text-zinc-200 border border-white/[0.08]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f === "all" ? "All" : f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#121214] border border-white/[0.05] rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
          <span className="w-5" />
          <span>Task</span>
          <span className="hidden sm:block">Priority</span>
          <span className="hidden md:block">Assignee</span>
          <span>Due</span>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {loading ? (
            <div className="p-12 text-center text-zinc-500 text-sm">Loading tasks...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm">No tasks found.</div>
          ) : (
            filtered.map((task) => (
              <div key={task.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors group">
                <div>{statusIcons[task.status?.toLowerCase()] || statusIcons.todo}</div>
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-500">{task.id.substring(0, 8).toUpperCase()}</span>
                    <Link to={`/projects`} className="text-[11px] text-zinc-600 hover:text-zinc-400 truncate max-w-[100px]">
                      {projects.find(p => p.id === task.projectId)?.name || "Project"}
                    </Link>
                  </div>
                  <p className="text-[13px] text-zinc-200 mt-0.5 group-hover:text-white transition-colors truncate">{task.title}</p>
                </div>
                <span className={`hidden sm:inline-flex items-center justify-center text-[10px] font-medium px-2 py-0.5 rounded border capitalize min-w-[60px] ${priorityStyles[task.priority?.toLowerCase()] || priorityStyles.medium}`}>
                  {(task.priority || "MEDIUM").toLowerCase()}
                </span>
                <div className="hidden md:flex items-center gap-1.5 w-24">
                   <div className="w-4 h-4 rounded-full bg-zinc-800 text-[8px] font-bold text-zinc-400 flex items-center justify-center">U</div>
                   <span className="text-[12px] text-zinc-400 truncate">Unassigned</span>
                </div>
                <span className="text-[12px] text-zinc-500 text-right w-12">Today</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
