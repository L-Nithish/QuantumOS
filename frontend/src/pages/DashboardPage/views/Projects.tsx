import { useState, useEffect } from "react";
import { 
  Target, Calendar, BarChart3, Plus, X
} from "lucide-react";
import { projectService, type Project } from "../../../api/projectService";
import { workspaceService, type Workspace } from "../../../api/workspaceService";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const ws = await workspaceService.getDefaultWorkspace();
      setWorkspace(ws);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !workspace) return;

    try {
      setCreating(true);
      const created = await projectService.createProject({
        ...newProject,
        workspaceId: workspace.id,
      });
      setProjects([created, ...projects]);
      setIsModalOpen(false);
      setNewProject({ name: "", description: "" });
    } catch (error) {
      console.error("Failed to create project", error);
      alert("Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  const getStatusStyle = (status: string | null | undefined = "ACTIVE") => {
    const s = status || "ACTIVE";
    switch (s.toUpperCase()) {
      case "ACTIVE": return "bg-zinc-800 text-zinc-300 border-zinc-700/50";
      case "AT_RISK": return "bg-red-950/20 text-red-400 border-red-900/30";
      case "COMPLETED": return "bg-zinc-900 text-zinc-400 border-zinc-800";
      case "ARCHIVED": return "bg-zinc-900 text-zinc-500 border-zinc-800";
      default: return "bg-zinc-800 text-zinc-300 border-zinc-700/50";
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 relative">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Projects</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Manage, scope, and track active work streams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 text-[12px] flex items-center gap-1.5 font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 hover:from-zinc-100 hover:to-zinc-300 rounded-md shadow-sm border border-white/10"
        >
          <Plus size={14} /> New Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
           <div className="col-span-1 md:col-span-2 p-12 text-center text-zinc-500 text-sm bg-[#121214] border border-white/[0.05] rounded-xl">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="col-span-1 md:col-span-2 p-12 text-center text-zinc-500 text-sm bg-[#121214] border border-white/[0.05] rounded-xl">No active projects found. Create one to get started!</div>
        ) : (
          projects.map((project, i) => (
            <div key={project.id || i} className="bg-[#121214] border border-white/[0.05] p-6 rounded-xl flex flex-col justify-between hover:border-white/[0.08] transition-colors relative group">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/[0.04] flex items-center justify-center shrink-0">
                      <Target size={18} className="text-zinc-400" />
                    </div>
                    <div className="min-w-0 pr-2">
                      <h3 className="text-[15px] font-semibold text-zinc-200 truncate">{project.name}</h3>
                      <p className="text-[12px] text-zinc-500 truncate">{project.description || "No description"}</p>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium border capitalize shrink-0 ${getStatusStyle(project.status)}`}>
                    {(project.status || "ACTIVE").replace("_", " ").toLowerCase()}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-zinc-500 font-medium">Completion Progress</span>
                    <span className="text-zinc-300 font-semibold">{project.progress || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-zinc-400 to-zinc-600 rounded-full" style={{ width: `${project.progress || 0}%` }} />
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.03] text-[12px] text-zinc-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={13} />
                    <span>Q3 Sprint</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 size={13} />
                    <span>Issues</span>
                  </div>
                </div>

                {/* Avatars */}
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#121214] bg-zinc-800 border border-white/5 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                    U
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
              <h2 className="text-[15px] font-semibold text-zinc-100">Create New Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-zinc-400">Project Name</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="E.g. API Gateway Refactor"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-zinc-400">Description</label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2 text-[13px] text-zinc-200 min-h-[80px] focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="What is this project about?"
                />
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
                  disabled={creating || !newProject.name}
                  className="px-4 py-2 text-[12px] font-medium text-zinc-950 bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                >
                  {creating ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
