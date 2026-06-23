import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Search, CheckCircle2, Circle, Clock, Play, X, Plus
} from "lucide-react";
import { taskService, type Task } from "../../../api/taskService";
import { projectService, type Project } from "../../../api/projectService";

export default function Issues() {
  const location = useLocation();
  const [issues, setIssues] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "MEDIUM", projectId: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
    if (location.state?.openModal) {
      setIsModalOpen(true);
      // Clean up the location state so it doesn't reopen if refreshed
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksData, projectsData] = await Promise.all([
        taskService.getAllTasks(),
        projectService.getAllProjects()
      ]);
      setIssues(tasksData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Failed to fetch issues", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.projectId) return;

    try {
      setCreating(true);
      const created = await taskService.createTask(newTask);
      setIssues([created, ...issues]);
      setIsModalOpen(false);
      setNewTask({ title: "", description: "", priority: "MEDIUM", projectId: "" });
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to create task. Make sure the project is valid.");
    } finally {
      setCreating(false);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === "all") return true;
    return issue.status?.toLowerCase() === filter.toLowerCase();
  });

  const getStatusIcon = (status: string | null | undefined = "TODO") => {
    const s = status || "TODO";
    switch (s.toLowerCase()) {
      case "done": return <CheckCircle2 size={15} className="text-zinc-400" />;
      case "in_progress": return <Play size={15} className="text-zinc-300 fill-zinc-300/10" />;
      case "in_review": return <Clock size={15} className="text-zinc-400" />;
      case "backlog": return <Circle size={15} className="text-zinc-600 border-dashed" />;
      default: return <Circle size={15} className="text-zinc-500" />;
    }
  };

  const getPriorityBadge = (priority: string | null | undefined = "MEDIUM") => {
    const p = (priority || "MEDIUM").toLowerCase();
    const colors: Record<string, string> = {
      urgent: "bg-red-950/20 text-red-400 border-red-900/30",
      high: "bg-orange-950/20 text-orange-400 border-orange-900/30",
      medium: "bg-zinc-800/30 text-zinc-300 border-zinc-700/30",
      low: "bg-zinc-900/30 text-zinc-500 border-zinc-800/30",
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${colors[p] || colors.medium} capitalize`}>
        {p}
      </span>
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 relative">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Issues</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Track work across teams, sprints, and epics.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 text-[12px] flex items-center gap-1.5 font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 hover:from-zinc-100 hover:to-zinc-300 rounded-md shadow-sm border border-white/10"
        >
          <Plus size={14} /> Create Issue
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {["all", "todo", "in_progress", "in_review", "done", "backlog"].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors border capitalize whitespace-nowrap ${
                filter === s
                  ? "bg-white/[0.04] text-zinc-200 border-white/10"
                  : "bg-transparent text-zinc-500 border-transparent hover:text-zinc-300"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#121214] border border-white/[0.05] text-[12px] text-zinc-400">
            <Search size={14} />
            <input type="text" placeholder="Filter..." className="bg-transparent border-none outline-none w-32 md:w-40 text-zinc-200 placeholder:text-zinc-600" />
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-[#121214] border border-white/[0.05] rounded-xl overflow-hidden shadow-sm">
        {loading ? (
           <div className="p-12 text-center text-zinc-500 text-sm">Loading issues...</div>
        ) : filteredIssues.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">No issues found.</div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {filteredIssues.map(issue => (
              <div key={issue.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.01] cursor-pointer transition-colors group">
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                  <span className="shrink-0">{getStatusIcon(issue.status)}</span>
                  <span className="text-[12px] font-mono text-zinc-500 shrink-0">{issue.id.substring(0, 8).toUpperCase()}</span>
                  <span className="text-[13px] text-zinc-200 truncate group-hover:text-zinc-100 transition-colors">{issue.title}</span>
                </div>
                
                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                  <span className="hidden md:inline-block text-[12px] text-zinc-500 font-medium truncate w-24">
                    {projects.find(p => p.id === issue.projectId)?.name || "Project"}
                  </span>
                  {getPriorityBadge(issue.priority)}
                  
                  <div className="hidden sm:flex items-center gap-2 w-24 justify-end">
                    <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-zinc-400">
                      U
                    </div>
                    <span className="text-[11px] text-zinc-400 truncate w-14">Unassigned</span>
                  </div>
                  
                  <span className="hidden sm:inline-block text-[11px] text-zinc-600 w-16 text-right">Today</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Issue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
              <h2 className="text-[15px] font-semibold text-zinc-100">Create New Issue</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-zinc-400">Title</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="E.g. Fix memory leak in auth module"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-zinc-400">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2 text-[13px] text-zinc-200 min-h-[80px] focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="Add details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-zinc-400">Project</label>
                  <select 
                    required
                    value={newTask.projectId}
                    onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:border-white/20 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  {projects.length === 0 && (
                    <p className="text-[11px] text-red-400 mt-1">You must create a Project first.</p>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-zinc-400">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:border-white/20 transition-colors appearance-none"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[12px] font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={creating || !newTask.projectId}
                  className="px-4 py-2 text-[12px] font-medium text-zinc-950 bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                >
                  {creating ? "Creating..." : "Create Issue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
