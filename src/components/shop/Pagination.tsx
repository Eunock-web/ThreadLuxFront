import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination: React.FC = () => {
  return (
    <nav className="flex items-center justify-center gap-2 py-20">
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-900 transition-colors">
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-pink)] text-white text-sm font-bold shadow-lg shadow-pink-200">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 text-sm font-medium hover:bg-slate-50 transition-colors">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 text-sm font-medium hover:bg-slate-50 transition-colors">
          3
        </button>
        <span className="px-2 text-slate-300">...</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 text-sm font-medium hover:bg-slate-50 transition-colors">
          14
        </button>
      </div>

      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-900 transition-colors">
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};
