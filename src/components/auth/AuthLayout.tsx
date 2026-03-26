import React from "react";
import { BrandPanel } from "./BrandPanel";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * AuthLayout — two-column shell for authentication pages.
 * Left: BrandPanel (hidden on mobile, shown on lg+).
 * Right: slot for form content.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className="min-h-screen flex" style={{ background: "var(--color-surface)" }}>
    {/* ── Left Editorial Column ──────────────────────── */}
    <BrandPanel />

    {/* ── Right Auth Column ──────────────────────────── */}
    <section
      className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Mobile brand header */}
      <div className="lg:hidden mb-12 self-start">
        <h1
          className="font-black text-3xl text-slate-900 italic tracking-tighter"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          ThreadLux
        </h1>
      </div>

      {/* Form slot */}
      <div className="w-full max-w-md">{children}</div>

      {/* Footer */}
      <footer
        className="mt-auto pt-16 flex items-center justify-between w-full max-w-md"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-outline)]">
          © ThreadLux Int.
        </span>
        <nav className="flex gap-4">
          {["Privacy", "Terms"].map((item) => (
            <a
              key={item}
              href="  /"
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-outline)] hover:text-[var(--color-pink)] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </footer>
    </section>
  </div>
);
