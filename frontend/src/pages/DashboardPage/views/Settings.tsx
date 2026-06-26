import { useState } from "react";
import { Bell, Globe, Lock, Moon, Palette, Shield, User } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "workspace", label: "Workspace", icon: Globe },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    mentions: true,
  });

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Settings</h1>
        <p className="text-[13px] text-zinc-400 mt-1">Manage your account and workspace preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <nav className="md:w-48 flex md:flex-col gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-white/[0.06] text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 bg-graphite border border-white/[0.05] rounded-xl p-6 space-y-6">
          {activeTab === "profile" && (
            <>
              <h2 className="text-[15px] font-semibold text-zinc-200">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] text-zinc-500 mb-1.5 block">Display name</label>
                  <input 
                    defaultValue={localStorage.getItem("quantumos_user_name") || "Sarah Kim"} 
                    className="w-full bg-charcoal border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-white/20" 
                  />
                </div>
                <div>
                  <label className="text-[12px] text-zinc-500 mb-1.5 block">Email</label>
                  <input 
                    defaultValue={localStorage.getItem("quantumos_user_email") || "sarah@quantum.inc"} 
                    className="w-full bg-charcoal border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-white/20" 
                  />
                </div>
                <div>
                  <label className="text-[12px] text-zinc-500 mb-1.5 block">Role</label>
                  <input defaultValue="Engineering Lead" disabled className="w-full bg-charcoal/50 border border-white/[0.04] rounded-lg px-3 py-2 text-sm text-zinc-500" />
                </div>
              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <h2 className="text-[15px] font-semibold text-zinc-200">Notifications</h2>
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between py-2 cursor-pointer">
                    <span className="text-[13px] text-zinc-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <button
                      type="button"
                      onClick={() => setNotifications((n) => ({ ...n, [key]: !value }))}
                      className={`w-9 h-5 rounded-full transition-colors relative ${value ? "bg-zinc-400" : "bg-zinc-700"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? "left-[18px]" : "left-0.5"}`} />
                    </button>
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === "appearance" && (
            <>
              <h2 className="text-[15px] font-semibold text-zinc-200">Appearance</h2>
              <div className="flex items-center gap-3 p-4 bg-charcoal rounded-lg border border-white/[0.04]">
                <Moon size={18} className="text-zinc-400" />
                <div>
                  <p className="text-[13px] text-zinc-200">Dark mode</p>
                  <p className="text-[12px] text-zinc-500">Always enabled for enterprise focus</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <>
              <h2 className="text-[15px] font-semibold text-zinc-200">Security</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 bg-charcoal rounded-lg border border-white/[0.04] hover:border-white/[0.08] transition-colors text-left">
                  <Lock size={18} className="text-zinc-400" />
                  <div>
                    <p className="text-[13px] text-zinc-200">Change password</p>
                    <p className="text-[12px] text-zinc-500">Last changed 30 days ago</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-charcoal rounded-lg border border-white/[0.04] hover:border-white/[0.08] transition-colors text-left">
                  <Shield size={18} className="text-zinc-400" />
                  <div>
                    <p className="text-[13px] text-zinc-200">Two-factor authentication</p>
                    <p className="text-[12px] text-zinc-500">Enabled via authenticator app</p>
                  </div>
                </button>
              </div>
            </>
          )}

          {activeTab === "workspace" && (
            <>
              <h2 className="text-[15px] font-semibold text-zinc-200">Workspace</h2>
              <div>
                <label className="text-[12px] text-zinc-500 mb-1.5 block">Workspace name</label>
                <input defaultValue="Quantum Inc" className="w-full bg-charcoal border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-white/20" />
              </div>
            </>
          )}

          <div className="pt-4 border-t border-white/[0.05]">
            <button className="px-4 py-2 text-[13px] font-medium text-zinc-950 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-lg">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
