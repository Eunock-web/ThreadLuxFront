import React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "social";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "signature-gradient neon-glow-btn text-white font-bold",
    "hover:scale-[1.02] active:scale-[0.98]",
    "transition-transform duration-200",
  ].join(" "),
  secondary: [
    "bg-white border border-[var(--color-surface-high)] text-[var(--color-on-surface)]",
    "hover:bg-[var(--color-surface)] transition-colors duration-200",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-on-surface-variant)]",
    "hover:bg-[var(--color-surface-high)] transition-colors duration-200",
  ].join(" "),
  social: [
    "bg-white border border-[var(--color-surface-high)] text-[var(--color-on-surface)]",
    "hover:bg-[var(--color-surface-high)] transition-colors duration-200",
    "flex items-center justify-center gap-2",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs py-2 px-4 rounded-lg",
  md: "text-sm py-3 px-5 rounded-xl",
  lg: "text-sm py-4 px-6 rounded-xl",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  return (
    <button
      disabled={disabled || loading}
      className={[
        base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
};
