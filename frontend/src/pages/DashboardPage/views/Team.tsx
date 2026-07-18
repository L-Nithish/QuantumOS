import { useEffect, useState } from "react";
import { Mail, MoreHorizontal, Shield, UserPlus } from "lucide-react";
import { workspaceService } from "../../../api/workspaceService";
import type { WorkspaceMember } from "../../../api/workspaceService";

export default function Team() {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("MEMBER");
  const [loading, setLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspaceAndMembers = async () => {
      try {
        const ws = await workspaceService.getDefaultWorkspace();
        setWorkspaceId(ws.id);
        const fetchedMembers = await workspaceService.getWorkspaceMembers(ws.id);
        setMembers(fetchedMembers);
      } catch (err) {
        console.error("Failed to load workspace members", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaceAndMembers();
  }, []);

  const handleInvite = async () => {
    if (!workspaceId || !inviteEmail) return;
    try {
      const newMember = await workspaceService.inviteMember(workspaceId, inviteEmail, inviteRole);
      setMembers([...members, newMember]);
      setIsInviteOpen(false);
      setInviteEmail("");
    } catch (err) {
      console.error("Failed to invite member", err);
      alert("Failed to invite member. User may not exist or is already in the workspace.");
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Team</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Manage members, roles, and workspace access.</p>
        </div>
        <button 
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-md border border-white/10"
        >
          <UserPlus size={14} />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-graphite border border-white/[0.05] rounded-xl p-5">
          <p className="text-[12px] text-zinc-500 mb-1">Total Members</p>
          <p className="text-2xl font-semibold text-zinc-100">{loading ? "-" : members.length}</p>
        </div>
        <div className="bg-graphite border border-white/[0.05] rounded-xl p-5">
          <p className="text-[12px] text-zinc-500 mb-1">Active Now</p>
          <p className="text-2xl font-semibold text-zinc-100">{loading ? "-" : members.length}</p>
        </div>
        <div className="bg-graphite border border-white/[0.05] rounded-xl p-5">
          <p className="text-[12px] text-zinc-500 mb-1">Pending Invites</p>
          <p className="text-2xl font-semibold text-zinc-100">0</p>
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
          {loading ? (
             <div className="p-5 text-zinc-500 text-sm">Loading members...</div>
          ) : members.length === 0 ? (
             <div className="p-5 text-zinc-500 text-sm">No members found.</div>
          ) : (
            members.map((member) => (
              <div key={member.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-800 border border-white/10 flex items-center justify-center text-[11px] font-medium text-zinc-300">
                      {getInitials(member.fullName)}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-graphite bg-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-zinc-200">{member.fullName}</p>
                    <p className="text-[12px] text-zinc-500">{member.role}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <span className="text-[12px] text-zinc-500">Active</span>
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors">
                    <Mail size={12} />
                    {member.email}
                  </a>
                </div>
                <button className="text-zinc-600 hover:text-zinc-400 transition-colors p-1">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-charcoal border border-white/10 rounded-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">Invite Member</h3>
            <div>
              <label className="text-[12px] text-zinc-400 block mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full bg-graphite border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-white/20" 
                placeholder="user@example.com"
              />
            </div>
            <div>
              <label className="text-[12px] text-zinc-400 block mb-1.5">Role</label>
              <select 
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full bg-graphite border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-white/20"
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button 
                onClick={() => setIsInviteOpen(false)}
                className="px-4 py-2 text-[13px] font-medium text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="px-4 py-2 text-[13px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-lg disabled:opacity-50"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
