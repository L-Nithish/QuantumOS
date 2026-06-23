import { Link } from "react-router-dom";

const productLinks = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "AI Command Center", to: "/ai-command-center" },
  { label: "Product Demo", to: "/#walkthrough" },
];

const companyLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/[0.06] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-gradient-to-tr from-titanium to-platinum flex items-center justify-center text-zinc-950 text-[10px] font-bold">
                Q
              </div>
              <span className="text-zinc-100 font-semibold tracking-tight">QuantumOS</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-xs mb-6">
              The AI-powered operating system for modern, high-velocity product teams.
            </p>
          </div>

          <div>
            <h4 className="text-zinc-100 font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-100 font-medium mb-4">Get Started</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">© 2026 Quantum Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
