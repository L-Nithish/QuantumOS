import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "text-zinc-950 border border-white/10 bg-gradient-to-br from-titanium to-platinum shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]",
  secondary:
    "text-zinc-300 border border-white/[0.08] bg-white/[0.02] hover:text-white hover:bg-white/[0.04]",
  ghost: "text-zinc-400 hover:text-white bg-transparent",
};

export default function Button({
  children,
  variant = "primary",
  to,
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-medium transition-colors duration-300";

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;

  return (
    <button type={type} onClick={onClick} className="border-0 bg-transparent p-0">
      {content}
    </button>
  );
}
