import React from "react";

/**
 * BrandPanel — left editorial column for auth pages.
 * Shows a fashion photo with gradient overlay, the ThreadLux wordmark,
 * tagline, edition badge, and a "Limited Drop" ticker chip.
 */
export const BrandPanel: React.FC = () => (
  <section
    className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden"
    aria-hidden="true"
  >
    {/* Background image */}
    <div className="absolute inset-0 z-0">
      <img
        alt="High-fashion editorial photography"
        className="w-full h-full object-cover grayscale brightness-75 scale-105"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5sr1IdtbSdWeAWETXi_paejfdSnBKn2OuNsmsO9HdNaOKg9f4uWXcC3ASZvzQzUZVFX0yf1LDizojaMiVcumGyOx-wNny8pU3PJ6WPEpi-zyXml4O9MtlBftyhIY3PN9g2c-tyEVGjXQdmqwnmAaOXUd_39Oa-TtmTnpgfbh9CYJAYVRlMu1Aq3Y1PUfxSu_ucu_HpeDTBBVvoXMNcp9Oqgo1Gfem__kPWeI5jHqJaaGrYtNer7RbezKI9f9M84kV7LS2Ar-8T6Tu"
        style={{ objectPosition: "center top" }}
      />
    </div>

    {/* Gradient overlay */}
    <div className="absolute inset-0 signature-gradient opacity-40 mix-blend-multiply" />
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(to top, #1a0020 0%, transparent 60%)",
      }}
    />

    {/* Text content */}
    <div className="relative z-10 p-20 w-full max-w-2xl">
      <h1
        className="font-black text-white text-7xl md:text-8xl tracking-tighter leading-none mb-6"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        Thread
        <br />
        <span className="text-[var(--color-pink)] italic">Lux</span>
      </h1>

      <p
        className="text-white/80 text-lg max-w-md leading-relaxed"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Access the exclusive digital runway. Curated streetwear meets
        high-fashion prestige.
      </p>

      {/* Edition line */}
      <div className="mt-12 flex items-center gap-4">
        <div
          className="h-px w-20"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />
        <span
          className="text-white/60 text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Edition 2024.01
        </span>
      </div>
    </div>

    {/* Limited Drop Chip */}
    <div className="absolute bottom-12 right-12 glass-card px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
      <span
        className="w-2 h-2 rounded-full bg-[var(--color-pink)] animate-pulse"
        aria-hidden="true"
      />
      <span
        className="text-[var(--color-on-surface)] text-xs uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Limited Drop: Neon Pulse Collection
      </span>
    </div>
  </section>
);
