import React from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = "",
  id,
  checked,
  ...rest
}) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={inputId}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            id={inputId}
            className="peer appearance-none w-5 h-5 rounded border-2 border-[var(--color-surface-high)] checked:border-[var(--color-pink)] checked:bg-[var(--color-pink)] transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink)]/30"
            checked={checked}
            {...rest}
          />
          <Check
            size={14}
            className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
            strokeWidth={3}
          />
        </div>
        <span
          className="text-sm text-[var(--color-on-surface-variant)] leading-tight select-none pt-0.5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
      </label>
      {error && (
        <p className="text-xs text-red-500 px-8">
          {error}
        </p>
      )}
    </div>
  );
};
