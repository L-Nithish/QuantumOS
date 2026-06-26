import { Mail, MoreHorizontal, Shield, UserPlus } from "lucide-react";

interface Member {
  name: string;
  role: string;
  email: string;
  initials: string;
  status: "active" | "away";
  projects: number;
}

export default function Team() {
  const loggedInName = localStorage.getItem("quantumos_user_name") || "Administrator";
  const loggedInEmail = localStorage.getItem("quantumos_user_email") || "admin@quantum.inc";
  const loggedInInitials = loggedInName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);

  const members: Member[] = [
    { name: loggedInName, role: "Workspace Admin", email: loggedInEmail, initials: loggedInInitials, status: "active", projects: 0 },
    { name: "Sarah Kim", role: "Engineering Lead", email: "sarah@quantum.inc", initials: "SK", status: "active", projects: 4 },
    { name: "Alex Morgan", role: "Senior Engineer", email: "alex@quantum.inc", initials: "AM", status: "active", projects: 3 },
    { name: "Emma Rodriguez", role: "Product Designer", email: "emma@quantum.inc", initials: "ER", status: "away", projects: 2 },
    { name: "David Chen", role: "Security Engineer", email: "david@quantum.inc", initials: "DC", status: "active", projects: 2 },
    { name: "Jordan Lee", role: "Product Manager", email: "jordan@quantum.inc", initials: "JL", status: "active", projects: 5 },
  ];
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Team</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Manage members, roles, and workspace access.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-md border border-white/10">
          <UserPlus size={14} />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-graphite border border-white/[0.05] rounded-xl p-5">
          <p className="text-[12px] text-zinc-500 mb-1">Total Members</p>
          <p className="text-2xl font-semibold text-zinc-100">12</p>
        </div>
        <div className="bg-graphite border border-white/[0.05] rounded-xl p-5">
          <p className="text-[12px] text-zinc-500 mb-1">Active Now</p>
          <p className="text-2xl font-semibold text-zinc-100">8</p>
        </div>
        <div className="bg-graphite border border-white/[0.05] rounded-xl p-5">
          <p className="text-[12px] text-zinc-500 mb-1">Pending Invites</p>
          <p className="text-2xl font-semibold text-zinc-100">2</p>
        </div>
      </div>

      <div className="bg-graphite border border-white/[0.05] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-zinc-200">Members</h2>
          <div className="flex items-center gap-2 text-[12px] text-zinc-500">
            <Shield size={14} />
            SSO enabled
          </div>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {members.map((member) => (
            <div key={member.email} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-800 border border-white/10 flex items-center justify-center text-[11px] font-medium text-zinc-300">
                    {member.initials}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-graphite ${member.status === "active" ? "bg-zinc-400" : "bg-zinc-600"}`} />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-zinc-200">{member.name}</p>
                  <p className="text-[12px] text-zinc-500">{member.role}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <span className="text-[12px] text-zinc-500">{member.projects} projects</span>
                <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Mail size={12} />
                  {member.email}
                </a>
              </div>
              <button className="text-zinc-600 hover:text-zinc-400 transition-colors p-1">
                <MoreHorizontal size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
