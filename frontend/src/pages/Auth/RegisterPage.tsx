import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Building2 } from "lucide-react";
import { EASE_PREMIUM } from "../../lib/motion";
import { authService } from "../../api/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.register(form.email, form.password, form.name);
      navigate("/dashboard");
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-titanium to-platinum flex items-center justify-center text-zinc-950 text-xs font-bold">
              Q
            </div>
            <span className="text-zinc-100 font-semibold">QuantumOS</span>
          </Link>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Create your workspace</h1>
          <p className="text-sm text-zinc-500 mt-2">Start your 14-day free trial. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-graphite border border-white/[0.06] rounded-2xl p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label className="text-[12px] font-medium text-zinc-400 mb-2 block">Full name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Sarah Kim"
                required
                className="w-full bg-charcoal border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/20 transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-zinc-400 mb-2 block">Company</label>
            <div className="relative">
              <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={form.company}
                onChange={update("company")}
                placeholder="Quantum Inc"
                required
                className="w-full bg-charcoal border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/20 transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-zinc-400 mb-2 block">Work email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
                required
                className="w-full bg-charcoal border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/20 transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-zinc-400 mb-2 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={update("password")}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                className="w-full bg-charcoal border border-white/[0.06] rounded-lg pl-10 pr-10 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/20 transition-colors"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-zinc-950 bg-gradient-to-r from-titanium to-platinum hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
          >
            {loading ? "Creating workspace..." : "Create workspace"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-300 hover:text-white transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
