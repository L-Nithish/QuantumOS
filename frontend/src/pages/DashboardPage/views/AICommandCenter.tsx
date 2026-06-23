import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Brain, AlertTriangle, Users, FileText, ListTodo,
  Send, ChevronRight, TrendingUp, Shield, Zap,
} from "lucide-react";
import { EASE_PREMIUM } from "../../../lib/motion";
import { aiService } from "../../../api/aiService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const insights = [
  { icon: Brain, label: "Workspace Intelligence", value: "94%", desc: "Context accuracy" },
  { icon: AlertTriangle, label: "Risk Detection", value: "2", desc: "Active alerts" },
  { icon: Users, label: "Team Insights", value: "78%", desc: "Capacity utilized" },
  { icon: TrendingUp, label: "Velocity Forecast", value: "+18%", desc: "Next sprint" },
];

const recommendations = [
  { title: "Reallocate Mobile App resources", reason: "Project is 12 days behind schedule with 3 blockers", priority: "high" },
  { title: "Schedule security review", reason: "Auth module changes require compliance check", priority: "medium" },
  { title: "Consolidate duplicate tasks", reason: "4 tasks across teams have overlapping scope", priority: "low" },
];

const risks = [
  { project: "Mobile App v3.0", level: "high", issue: "Sprint velocity dropped 34% over 2 weeks" },
  { project: "API Gateway", level: "medium", issue: "Key engineer on PTO during critical phase" },
];

const quickActions = [
  { icon: FileText, label: "Generate Report", action: "report" },
  { icon: ListTodo, label: "Create Tasks", action: "tasks" },
  { icon: Shield, label: "Risk Analysis", action: "risk" },
  { icon: Zap, label: "Optimize Sprint", action: "sprint" },
];

export default function AICommandCenter() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Good morning, Sarah. I've analyzed your workspace overnight. Mobile App v3.0 has elevated risk — would you like me to generate a mitigation plan?" },
  ]);
  const [input, setInput] = useState("");
  const [activePanel, setActivePanel] = useState<"chat" | "insights" | "risks">("chat");
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const userQuery = input.trim();
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: userQuery };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const response = await aiService.processCommand(userQuery, conversationId);
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.reply,
        },
      ]);
    } catch (error) {
      console.error("AI command failed", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I apologize, but I encountered an error communicating with the AI Engine. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    if (sending) return;
    const responses: Record<string, string> = {
      report: "Generate performance report",
      tasks: "Create sprint tasks",
      risk: "Perform workspace risk analysis",
      sprint: "Optimize current sprint velocity",
    };
    
    const query = responses[action] || action;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);
    setActivePanel("chat");

    try {
      const response = await aiService.processCommand(query, conversationId);
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.reply,
        },
      ]);
    } catch (error) {
      console.error("AI action failed", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Failed to process quick action.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Command Center Header */}
      <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-300/10 to-zinc-500/5 border border-white/[0.08] flex items-center justify-center">
            <Sparkles size={18} className="text-zinc-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">AI Command Center</h1>
            <p className="text-[12px] text-zinc-500">Workspace intelligence · Risk detection · AI recommendations</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left: Intelligence Panels */}
        <div className="hidden lg:flex w-80 flex-col border-r border-white/[0.05] bg-charcoal/50">
          <div className="p-4 grid grid-cols-2 gap-3">
            {insights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: EASE_PREMIUM }}
                className="bg-graphite border border-white/[0.05] rounded-xl p-3"
              >
                <item.icon size={14} className="text-zinc-500 mb-2" />
                <p className="text-lg font-semibold text-zinc-100">{item.value}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="px-4 pb-4 flex-1 overflow-y-auto space-y-4">
            <div>
              <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-1">Recommendations</h3>
              <div className="space-y-2">
                {recommendations.map((rec) => (
                  <button
                    key={rec.title}
                    className="w-full text-left bg-graphite border border-white/[0.05] rounded-lg p-3 hover:border-white/[0.1] transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[12px] text-zinc-200 group-hover:text-white transition-colors">{rec.title}</p>
                      <ChevronRight size={12} className="text-zinc-600 mt-0.5 shrink-0" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">{rec.reason}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-1">Active Risks</h3>
              <div className="space-y-2">
                {risks.map((risk) => (
                  <div key={risk.project} className="bg-graphite border border-white/[0.05] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded uppercase ${
                        risk.level === "high" ? "bg-red-950/30 text-red-400" : "bg-zinc-800 text-zinc-400"
                      }`}>
                        {risk.level}
                      </span>
                      <span className="text-[12px] text-zinc-300">{risk.project}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">{risk.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: AI Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile tabs */}
          <div className="lg:hidden flex border-b border-white/[0.05]">
            {(["chat", "insights", "risks"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePanel(tab)}
                className={`flex-1 py-3 text-[12px] font-medium capitalize transition-colors ${
                  activePanel === tab ? "text-zinc-200 border-b border-zinc-400" : "text-zinc-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: EASE_PREMIUM }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-zinc-300 text-zinc-950"
                        : "bg-graphite border border-white/[0.06] text-zinc-300"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles size={12} className="text-zinc-500" />
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Quantum AI</span>
                      </div>
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-graphite border border-white/[0.06] text-[11px] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.1] transition-colors whitespace-nowrap"
              >
                <action.icon size={12} />
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-3 bg-graphite border border-white/[0.06] rounded-xl px-4 py-2 focus-within:border-white/[0.12] transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Quantum AI anything about your workspace..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-200 placeholder:text-zinc-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-zinc-300 text-zinc-950 disabled:opacity-30 hover:opacity-90 transition-opacity"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
