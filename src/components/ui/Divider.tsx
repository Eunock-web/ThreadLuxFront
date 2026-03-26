import React from "react";

interface DividerProps {
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ label }) => (
  <div className="relative flex items-center my-4">
    <div className="flex-1 border-t border-[var(--color-outline-variant)]/30" />
    {label && (
      <span
        className="mx-4 text-[10px] uppercase tracking-[0.2em] text-[var(--color-outline)] bg-[var(--color-surface)] px-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
    )}
    <div className="flex-1 border-t border-[var(--color-outline-variant)]/30" />
  </div>
);
