import React, { forwardRef, useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightAddon, className = "", id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-on-surface-variant)] px-1"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full px-4 py-3 rounded-xl",
              "bg-[var(--color-surface-highest)] border-none",
              "text-[var(--color-on-surface)] placeholder:text-[var(--color-outline-variant)]",
              "outline-none ring-2 ring-transparent",
              "focus:ring-[var(--color-pink)]/30",
              "transition-all duration-200",
              "text-sm",
              error ? "ring-red-400" : "",
              rightAddon ? "pr-12" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          />
          {rightAddon && (
            <span className="absolute right-3 flex items-center text-[var(--color-outline-variant)]">
              {rightAddon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 px-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ── Password Input (Input + toggle visibility) ──────── */
interface PasswordInputProps extends Omit<InputProps, "type" | "rightAddon"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    const toggle = () => setVisible((v) => !v);

    return (
      <Input
        ref={ref}
        label={label}
        type={visible ? "text" : "password"}
        rightAddon={
          <button
            type="button"
            onClick={toggle}
            className="cursor-pointer hover:text-[var(--color-on-surface)] transition-colors"
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        {...rest}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
