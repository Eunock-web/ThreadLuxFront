import React from "react";
import { ChevronDown } from "lucide-react";

export const ShopSidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold text-slate-900 text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
          Filtres
        </h2>
        <button className="text-[var(--color-pink)] text-[10px] font-bold uppercase tracking-widest hover:underline">
          Tout effacer
        </button>
      </div>

      {/* Active Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {["Robe", "M"].map((tag) => (
          <span key={tag} className="inline-flex items-center bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-200">
            {tag}
            <button className="ml-2 hover:text-[var(--color-pink)]">×</button>
          </span>
        ))}
      </div>

      {/* Accordion Categories */}
      <div className="space-y-10">
        {/* Catégorie */}
        <div>
          <button className="flex items-center justify-between w-full mb-5 font-bold text-slate-900 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Catégorie
            <ChevronDown size={14} />
          </button>
          <ul className="space-y-4 text-slate-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            {["Robes & Combis", "Tops & T-shirts", "Vestes & Manteaux", "Pantalons"].map((cat) => (
              <li key={cat} className="flex items-center gap-3 cursor-pointer hover:text-slate-900 transition-colors">
                <div className="w-4 h-4 rounded border-2 border-slate-200" />
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Taille */}
        <div>
          <button className="flex items-center justify-between w-full mb-5 font-bold text-slate-900 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Taille
            <ChevronDown size={14} />
          </button>
          <div className="grid grid-cols-4 gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`h-10 rounded-xl border flex items-center justify-center text-[10px] font-bold transition-all ${
                  size === "M" 
                    ? "border-[var(--color-pink)] text-[var(--color-pink)] bg-pink-50" 
                    : "border-slate-100 text-slate-500 bg-slate-50 hover:border-slate-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div>
          <button className="flex items-center justify-between w-full mb-5 font-bold text-slate-900 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Prix
            <ChevronDown size={14} />
          </button>
          <div className="px-1">
            <div className="relative h-1 bg-slate-100 rounded-full mb-4">
              <div className="absolute h-full bg-[var(--color-pink)] rounded-full left-[20%] right-[30%]" />
              <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-3 h-3 bg-white border-2 border-[var(--color-pink)] rounded-full shadow-md" />
              <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-3 h-3 bg-white border-2 border-[var(--color-pink)] rounded-full shadow-md" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>25€</span>
              <span>250€+</span>
            </div>
          </div>
        </div>

        {/* Couleur */}
        <div>
          <button className="flex items-center justify-between w-full mb-5 font-bold text-slate-900 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Couleur
            <ChevronDown size={14} />
          </button>
          <div className="flex flex-wrap gap-3">
            {["#000", "#D01374", "#E5E7EB", "#FEF08A", "#4C1D95"].map((color, idx) => (
              <button
                key={idx}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  idx === 1 ? "border-[var(--color-pink)] p-0.5" : "border-transparent"
                }`}
              >
                <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
              </button>
            ))}
          </div>
        </div>

        {/* Disponibilité */}
        <div>
          <button className="flex items-center justify-between w-full mb-5 font-bold text-slate-900 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Disponibilité
            <ChevronDown size={14} />
          </button>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              En stock uniquement
            </span>
            <div className="w-10 h-6 bg-[var(--color-pink)] rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
