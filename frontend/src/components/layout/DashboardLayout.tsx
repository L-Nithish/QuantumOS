import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Search, Bell, Settings, Plus, LayoutDashboard,
  Target, Activity, BarChart3, Users, ListTodo, ChevronDown, Monitor,
  CreditCard, Shield, Globe, HelpCircle
} from "lucide-react";
import CommandPalette from "../ui/CommandPalette";
import KeyboardShortcuts from "../ui/KeyboardShortcuts";

const navGroups: {
  label: string | null;
  items: { to: string; icon: any; label: string; highlight?: boolean }[];
}[] = [
  {
    label: null,
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
      { to: "/tasks", icon: ListTodo, label: "Tasks" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/projects", icon: Target, label: "Projects" },
      { to: "/dashboard/issues", icon: Activity, label: "Issues" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/team", icon: Users, label: "Team" },
      { to: "/dashboard/billing", icon: CreditCard, label: "Billing" },
      { to: "/dashboard/workspace/settings", icon: Globe, label: "Workspace Settings" },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/dashboard/admin/users", icon: Shield, label: "Admin Panel" },
    ],
  },
  {
    label: "Systems",
    items: [
      { to: "/os", icon: Monitor, label: "Spatial OS Desktop", highlight: true },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/analytics": "Analytics",
  "/team": "Team",
  "/settings": "Settings",
  "/ai-command-center": "AI Command Center",
  "/dashboard/issues": "Issues",
  "/dashboard/overview": "Overview",
  "/dashboard/notifications": "Notifications",
  "/dashboard/billing": "Billing",
  "/dashboard/workspace/create": "Create Workspace",
  "/dashboard/workspace/settings": "Workspace Settings",
  "/dashboard/workspace/roles": "Roles & Permissions",
  "/dashboard/admin/users": "User Management",
  "/dashboard/admin/audit-logs": "Audit Logs",
  "/dashboard/admin/analytics": "System Analytics",
};

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="flex h-screen bg-charcoal text-zinc-300 font-sans">
      <aside className="w-[240px] flex-shrink-0 border-r border-white/[0.05] bg-charcoal flex flex-col">
        <div className="h-14 flex items-center justify-between px-4 hover:bg-white/[0.02] cursor-pointer transition-colors border-b border-white/[0.05]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-zinc-600 to-zinc-800 border border-white/10 flex items-center justify-center text-white text-[11px] font-bold">
              Q
            </div>
            <span className="text-[13px] font-medium text-zinc-200">Quantum Inc</span>
          </Link>
          <ChevronDown size={14} className="text-zinc-500" />
        </div>

        <div className="p-3">
          <button 
            onClick={() => navigate("/dashboard/issues", { state: { openModal: true } })}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-white/[0.04] text-[13px] text-zinc-200"
          >
            <Plus size={14} className="text-zinc-400" />
            <span>New Issue</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label ?? "main"}>
              {group.label && (
                <div className="text-[11px] font-semibold text-zinc-500 px-3 mb-2 tracking-wider uppercase">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.to}
                    to={item.to}
                    icon={<item.icon size={15} />}
                    label={item.label}
                    highlight={item.highlight}
                    currentPath={location.pathname}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-white/[0.05]">
          <Link
            to="/settings"
            className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/[0.03] rounded-md transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-800 border border-white/10" />
            <span className="text-[13px] font-medium text-zinc-300">
              {localStorage.getItem("quantumos_user_name") || "Sarah K."}
            </span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-charcoal">
        <header className="h-14 border-b border-white/[0.05] flex items-center justify-between px-6 bg-charcoal/90 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-[13px]">
            <Link to="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">QuantumOS</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300 font-medium">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-charcoal border border-white/[0.05] text-[12px] text-zinc-400 w-56 focus-within:border-white/10 transition-all">
              <Search size={14} className="text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none flex-1 placeholder:text-zinc-600 text-zinc-200 text-[12px]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  const evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                  document.dispatchEvent(evt);
                }}
                className="text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:block" 
                aria-label="Search Command Palette"
                title="Search (Ctrl+K)"
              >
                <Search size={16} />
              </button>
              <button 
                onClick={() => {
                  const evt = new KeyboardEvent('keydown', { key: '?' });
                  document.dispatchEvent(evt);
                }}
                className="text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:block" 
                aria-label="Help & Shortcuts"
                title="Help & Shortcuts (?)"
              >
                <HelpCircle size={16} />
              </button>
              <Link to="/dashboard/notifications" className="text-zinc-500 hover:text-zinc-300 transition-colors relative" aria-label="Notifications">
                <Bell size={16} />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-zinc-400 rounded-full" />
              </Link>
              <Link to="/settings" className="text-zinc-500 hover:text-zinc-300 transition-colors" aria-label="Settings">
                <Settings size={16} />
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      
      <CommandPalette />
      <KeyboardShortcuts />
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  to,
  currentPath,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  currentPath: string;
  highlight?: boolean;
}) {
  const active = currentPath === to || (to === "/dashboard" && currentPath === "/dashboard/overview");

  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors group ${
        active
          ? "bg-white/[0.06] text-zinc-100"
          : highlight
            ? "text-zinc-300 hover:bg-white/[0.03] hover:text-zinc-100"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
      }`}
    >
      <div className={`transition-colors ${active ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-400"}`}>
        {icon}
      </div>
      <span className="text-[13px] font-medium">{label}</span>
      {highlight && !active && (
        <span className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500 border border-white/[0.04]">
          AI
        </span>
      )}
    </Link>
  );
}
